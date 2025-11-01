Task_STATUS_CHOICES = (
    ("New", "New"),
    ("In Progress", "In Progress"),
    ("Completed", "Completed"),
)
INDCHOICES = (
    ("ADVERTISING", "ADVERTISING"),
    ("AGRICULTURE", "AGRICULTURE"),
    ("APPAREL & ACCESSORIES", "APPAREL & ACCESSORIES"),
    ("AUTOMOTIVE", "AUTOMOTIVE"),
    ("BANKING", "BANKING"),
    ("BIOTECHNOLOGY", "BIOTECHNOLOGY"),
    ("BUILDING MATERIALS & EQUIPMENT", "BUILDING MATERIALS & EQUIPMENT"),
    ("CHEMICAL", "CHEMICAL"),
    ("COMPUTER", "COMPUTER"),
    ("EDUCATION", "EDUCATION"),
    ("ELECTRONICS", "ELECTRONICS"),
    ("ENERGY", "ENERGY"),
    ("ENTERTAINMENT & LEISURE", "ENTERTAINMENT & LEISURE"),
    ("FINANCE", "FINANCE"),
    ("FOOD & BEVERAGE", "FOOD & BEVERAGE"),
    ("GROCERY", "GROCERY"),
    ("HEALTHCARE", "HEALTHCARE"),
    ("INSURANCE", "INSURANCE"),
    ("LEGAL", "LEGAL"),
    ("MANUFACTURING", "MANUFACTURING"),
    ("PUBLISHING", "PUBLISHING"),
    ("REAL ESTATE", "REAL ESTATE"),
    ("SERVICE", "SERVICE"),
    ("SOFTWARE", "SOFTWARE"),
    ("SPORTS", "SPORTS"),
    ("TECHNOLOGY", "TECHNOLOGY"),
    ("TELECOMMUNICATIONS", "TELECOMMUNICATIONS"),
    ("TELEVISION", "TELEVISION"),
    ("TRANSPORTATION", "TRANSPORTATION"),
    ("VENTURE CAPITAL", "VENTURE CAPITAL"),
)

TYPECHOICES = (
    ("CUSTOMER", "CUSTOMER"),
    ("INVESTOR", "INVESTOR"),
    ("PARTNER", "PARTNER"),
    ("RESELLER", "RESELLER"),
)

ROLES = (
    ("ADMIN", "ADMIN"),
    ("SELLER", "SELLER"),
    ("CUSTOMER", "CUSTOMER"),
    ("Organization", "Organization" ),


)
SOCIAL_MEDIA_TYPES = (
    ("INSTAGRAM", "INSTAGRAM"),
    ("OTHER", "OTHER"),


)
LEAD_STATUS = (
    ("assigned", "Assigned"),
    ("in process", "In Process"),
    ("converted", "Converted"),
    ("recycled", "Recycled"),
    ("closed", "Closed"),
)


LEAD_SOURCE = (
    ("call", "Call"),
    ("email", "Email"),
    ("existing customer", "Existing Customer"),
    ("partner", "Partner"),
    ("public relations", "Public Relations"),
    ("compaign", "Campaign"),
    ("other", "Other"),
)

STATUS_CHOICE = (
    ("New", "New"),
    ("Assigned", "Assigned"),
    ("Pending", "Pending"),
    ("Closed", "Closed"),
    ("Rejected", "Rejected"),
    ("Duplicate", "Duplicate"),
)

PRIORITY_CHOICE = (
    ("Low", "Low"),
    ("Normal", "Normal"),
    ("High", "High"),
    ("Urgent", "Urgent"),
)

CASE_TYPE = (("Question", "Question"), ("Incident", "Incident"), ("Problem", "Problem"))

STAGES = (
    ("QUALIFICATION", "QUALIFICATION"),
    ("NEEDS ANALYSIS", "NEEDS ANALYSIS"),
    ("VALUE PROPOSITION", "VALUE PROPOSITION"),
    ("ID.DECISION MAKERS", "ID.DECISION MAKERS"),
    ("PERCEPTION ANALYSIS", "PERCEPTION ANALYSIS"),
    ("PROPOSAL/PRICE QUOTE", "PROPOSAL/PRICE QUOTE"),
    ("NEGOTIATION/REVIEW", "NEGOTIATION/REVIEW"),
    ("CLOSED WON", "CLOSED WON"),
    ("CLOSED LOST", "CLOSED LOST"),
)

SOURCES = (
    ("NONE", "NONE"),
    ("CALL", "CALL"),
    ("EMAIL", " EMAIL"),
    ("EXISTING CUSTOMER", "EXISTING CUSTOMER"),
    ("PARTNER", "PARTNER"),
    ("PUBLIC RELATIONS", "PUBLIC RELATIONS"),
    ("CAMPAIGN", "CAMPAIGN"),
    ("WEBSITE", "WEBSITE"),
    ("OTHER", "OTHER"),
)
EVENT_TYPE = (
    ("Recurring", "Recurring"),
    ("Non-Recurring", "Non-Recurring"),
    ("Call", "Call"),
    ('Meeting', 'Meeting'),
    ('Task', 'Task')
)

EVENT_PARENT_TYPE = ((10, "Account"), (13, "Lead"), (14, "Opportunity"), (11, "Case"))

EVENT_STATUS = (
    ("Planned", "Planned"),
    ("Held", "Held"),
    ("Not Held", "Not Held"),
    ("Not Started", "Not Started"),
    ("Started", "Started"),
    ("Completed", "Completed"),
    ("Canceled", "Canceled"),
    ("Deferred", "Deferred"),
)
TICKET_STATUS = (
    ("Answer", "Answer"),
    ("Not Answer", "Not Answer"),
    ("Completed", "Completed"),
    ("Canceled", "Canceled"),
    ("Deferred", "Deferred"),
)