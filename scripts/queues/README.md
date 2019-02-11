# Queue Names
- `amazon-fetch` -- schedules the retrieval of amazon product pages
- `amazon-parse` -- parses the stored html provided by the amazon-fetch queue; these jobs are scheduled by the amazon-fetch workers
- `updated-price` -- a new job is scheduled anytime a price change is observed; this is a place where you could identify new deals, for example.