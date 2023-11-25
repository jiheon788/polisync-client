# Requirement

### Web Socket Chat (Web Socket Server)

- [x] user interface (username input, enter chat room button, chat list, user info)
- [x] User 1, User 2, ...N join a meeting room (using querystring, authentication/authorization not required)
- [x] Exchange messages within the chat room

### Speech to Text (Web Speech API)

- [x] user interface (mic on/off button)
- [x] Microphone on: Convert user's voice into text
- [x] Microphone off: Deactivate Speech mode and simultaneously send the chat message

### Search References (National Assembly data)

- [x] user interface (side drawer)
- [x] When a specific keyword comes out, search for References. (National Assembly API)
- [x] References are shown using infinite scrolls. (IntersectionObserver API)

### Meeting Summary (using Generative AI)

- [x] user interface (finish button, loading UI)
- [ ] Finish meeting (speech command)
- [x] Use AI to summarize the main content (client - server - openai)
