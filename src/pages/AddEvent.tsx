import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

const STATES = [
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "West Bengal",
  "Telangana",
  "Rajasthan",
  "Gujarat",
  "Kerala",
  "Uttar Pradesh",
  "Punjab",
  "Madhya Pradesh",
];

const CATEGORIES = [
  { value: "festival", label: "Festival" },
  { value: "cultural", label: "Cultural" },
  { value: "religious", label: "Religious" },
  { value: "exhibition", label: "Exhibition" },
  { value: "entertainment", label: "Entertainment" },
];

const EVENT_TYPES = [
  { value: "fixed_time", label: "Fixed Time" },
  { value: "flexible_time", label: "Flexible Time" },
];

const PRIORITIES = [
  { value: "high", label: "High", color: "text-red-600" },
  { value: "medium", label: "Medium", color: "text-amber-600" },
  { value: "low", label: "Low", color: "text-green-600" },
];

interface ConflictingEvent {
  id: string;
  event_name: string;
  start_date: string;
  end_date: string;
}

export default function AddEvent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [conflicts, setConflicts] = useState<ConflictingEvent[]>([]);
  const [formData, setFormData] = useState({
    eventName: "",
    state: "",
    city: "",
    category: "",
    startDate: undefined as Date | undefined,
    startTime: "",
    endDate: undefined as Date | undefined,
    endTime: "",
    description: "",
    eventType: "fixed_time",
    priority: "medium",
  });

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/event-owner/auth");
      }
    });
  }, [navigate]);

  // Check for conflicts when location and dates change
  useEffect(() => {
    const checkConflicts = async () => {
      if (!formData.city || !formData.startDate || !formData.endDate || !formData.startTime || !formData.endTime) {
        setConflicts([]);
        return;
      }

      const startDateTime = new Date(formData.startDate);
      const [startHours, startMinutes] = formData.startTime.split(":");
      startDateTime.setHours(parseInt(startHours), parseInt(startMinutes));

      const endDateTime = new Date(formData.endDate);
      const [endHours, endMinutes] = formData.endTime.split(":");
      endDateTime.setHours(parseInt(endHours), parseInt(endMinutes));

      const { data: overlappingEvents } = await supabase
        .from("owner_events")
        .select("id, event_name, start_date, end_date")
        .eq("city", formData.city)
        .neq("status", "rejected")
        .or(`and(start_date.lte.${endDateTime.toISOString()},end_date.gte.${startDateTime.toISOString()})`);

      setConflicts(overlappingEvents || []);
    };

    checkConflicts();
  }, [formData.city, formData.startDate, formData.endDate, formData.startTime, formData.endTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!formData.eventName || !formData.state || !formData.city || !formData.category) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (!formData.startDate || !formData.endDate || !formData.startTime || !formData.endTime) {
        toast.error("Please set event start and end date/time");
        return;
      }

      const startDateTime = new Date(formData.startDate);
      const [startHours, startMinutes] = formData.startTime.split(":");
      startDateTime.setHours(parseInt(startHours), parseInt(startMinutes));

      const endDateTime = new Date(formData.endDate);
      const [endHours, endMinutes] = formData.endTime.split(":");
      endDateTime.setHours(parseInt(endHours), parseInt(endMinutes));

      if (endDateTime <= startDateTime) {
        toast.error("End date/time must be after start date/time");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be logged in");
        navigate("/event-owner/auth");
        return;
      }

      const { error } = await supabase.from("owner_events").insert({
        owner_id: session.user.id,
        event_name: formData.eventName,
        state: formData.state,
        city: formData.city,
        category: formData.category as any,
        start_date: startDateTime.toISOString(),
        end_date: endDateTime.toISOString(),
        description: formData.description || null,
        event_type: formData.eventType as any,
        priority: formData.priority as any,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Event submitted successfully! Awaiting admin approval.");
      navigate("/event-owner/my-events");
    } catch (error: any) {
      toast.error(error.message || "Failed to create event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-background to-primary/5">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/event-owner/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-display text-xl font-bold text-primary">Add New Event</h1>
              <p className="text-sm text-muted-foreground">Create an event for tourists</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Fill in the details below. Your event will be reviewed by an admin before being published.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Name */}
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name *</Label>
                <Input
                  id="eventName"
                  placeholder="e.g., Diwali Festival 2024"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  required
                />
              </div>

              {/* State & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City / Location *</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Event Category *</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !formData.startDate && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(d) => setFormData({ ...formData, startDate: d })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* End Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !formData.endDate && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(d) => setFormData({ ...formData, endDate: d })}
                        disabled={(date) => date < (formData.startDate || new Date())}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Conflict Warning */}
              {conflicts.length > 0 && (
                <Alert variant="destructive" className="border-amber-500 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <strong>Potential conflicts detected!</strong> The following events overlap at this location:
                    <ul className="mt-2 list-disc list-inside">
                      {conflicts.map((event) => (
                        <li key={event.id}>{event.event_name}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event for tourists..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Event Type & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <Select value={formData.eventType} onValueChange={(v) => setFormData({ ...formData, eventType: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          <span className={p.color}>{p.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate("/event-owner/dashboard")} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Submitting..." : "Submit Event"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
