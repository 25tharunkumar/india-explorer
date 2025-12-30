import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { format } from "date-fns";
import { CheckCircle, XCircle, Clock, LogOut, Shield, MapPin, Calendar } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface OwnerEvent {
  id: string;
  event_name: string;
  state: string;
  city: string;
  category: string;
  start_date: string;
  end_date: string;
  description: string | null;
  event_type: string;
  priority: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
    organization: string | null;
  };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<OwnerEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    event: OwnerEvent | null;
    action: "approve" | "reject" | null;
  }>({ open: false, event: null, action: null });
  const [adminNotes, setAdminNotes] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate("/admin/auth");
        return;
      }

      // Check admin role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      if (!roles?.some(r => r.role === "admin")) {
        toast.error("Access denied. Admin only.");
        navigate("/admin/auth");
        return;
      }

      setUser(session.user);
      await fetchEvents();
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("owner_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load events");
      return;
    }

    setEvents(data || []);
  };

  const handleAction = async () => {
    if (!actionDialog.event || !actionDialog.action) return;

    const { error } = await supabase
      .from("owner_events")
      .update({
        status: actionDialog.action === "approve" ? "approved" : "rejected",
        admin_notes: adminNotes || null,
      })
      .eq("id", actionDialog.event.id);

    if (error) {
      toast.error("Failed to update event");
      return;
    }

    toast.success(`Event ${actionDialog.action === "approve" ? "approved" : "rejected"} successfully`);
    setActionDialog({ open: false, event: null, action: null });
    setAdminNotes("");
    fetchEvents();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="border-red-300 text-red-600">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-amber-300 text-amber-600">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="border-green-300 text-green-600">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredEvents = events.filter((event) => {
    if (activeTab === "all") return true;
    return event.status === activeTab;
  });

  const stats = {
    pending: events.filter(e => e.status === "pending").length,
    approved: events.filter(e => e.status === "approved").length,
    rejected: events.filter(e => e.status === "rejected").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-primary/5">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage event approvals</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-amber-500/20 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("pending")}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("approved")}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-500/20 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("rejected")}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
                <TabsTrigger value="all">All ({events.length})</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No events in this category
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{event.event_name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{event.category}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{event.profiles?.full_name || "Unknown"}</p>
                          <p className="text-muted-foreground">{event.profiles?.organization}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3" />
                          {event.city}, {event.state}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(event.start_date), "MMM d, yyyy")}
                          </div>
                          <p className="text-muted-foreground">
                            {format(new Date(event.start_date), "h:mm a")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(event.priority)}</TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                      <TableCell className="text-right">
                        {event.status === "pending" && (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => setActionDialog({ open: true, event, action: "approve" })}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => setActionDialog({ open: true, event, action: "reject" })}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {event.status !== "pending" && event.admin_notes && (
                          <p className="text-xs text-muted-foreground max-w-[200px] truncate" title={event.admin_notes}>
                            Note: {event.admin_notes}
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Action Dialog */}
        <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionDialog.action === "approve" ? "Approve Event" : "Reject Event"}
              </DialogTitle>
              <DialogDescription>
                {actionDialog.action === "approve"
                  ? "This event will be visible to tourists after approval."
                  : "Please provide a reason for rejection."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="font-medium">{actionDialog.event?.event_name}</p>
                <p className="text-sm text-muted-foreground">
                  {actionDialog.event?.city}, {actionDialog.event?.state}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminNotes">
                  {actionDialog.action === "approve" ? "Notes (optional)" : "Rejection Reason *"}
                </Label>
                <Textarea
                  id="adminNotes"
                  placeholder={actionDialog.action === "approve" ? "Any notes for the event owner..." : "Explain why this event is being rejected..."}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setActionDialog({ open: false, event: null, action: null });
                setAdminNotes("");
              }}>
                Cancel
              </Button>
              <Button
                variant={actionDialog.action === "approve" ? "default" : "destructive"}
                onClick={handleAction}
                disabled={actionDialog.action === "reject" && !adminNotes}
              >
                {actionDialog.action === "approve" ? "Approve" : "Reject"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
