# Building a AI based application to schedule Doctor Appoinment

## RELATIONAL DATABASE
For the booking data

### Pre-research
what is the FHIR scheduling pattern?

1. Schedule, "Dr. Smith works at Clinic A on weekdays from 9–5."
    Who, Where, Time availability during the day.
2. Slot, "A 15-minute block on Monday from 9:00–9:15 is free."
3. Appointment, "Patient John Doe is scheduled with Dr. Smith from 9:00–9:15."

Schedule (provider availability)
      |
      | 1-to-many
      v
Slot (actual slice of time: free/busy)
      |
      | 0..1-to-1
      v
Appointment (booked event)

--- Present a tables and relations summary in markdown.

### Prompt to generate db overview

Create a relational database overview to schedule Doctor Appointment.
Research different solutions.
Use the FHIR scheduling pattern.
Consider all Doctors are available from Monday thru Friday from 9 AM to 5 PM.
Consider slots of 20 minutes, from Monday thru Friday from 9 AM to 5 PM 
(a slot will have a column enabled which will be false for a holiday else true).    
Just focus on the minimum number of entities.

# Ignore concepts like
- patient insurance, 
- appoinment location (There is only one location), 
- cancellation.

# Using Microsoft SQL Server DDL scripts.
Create the tables, with primary key and other relationships.

# Using Microsoft SQL Server DML scripts populate the tables for 

Create the following 3 Doctors
Doctor Joe Moreau
Doctor Strange Love
doctor Yuri Zhivago

Create the slots for the month of december 2025.

