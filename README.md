# ContextNet App - Human-Agent Communication Interface

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Material--UI-5.15-0081CB?style=for-the-badge&logo=mui" alt="Material-UI" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</div>

## About the Project

The **ContextNet App** is a web application developed as part of the final course project (TCC) for the Information Systems degree. This application serves as a frontend interface for communication between humans and intelligent agents through the ContextNet network, using the KQML (Knowledge Query and Manipulation Language) protocol.

### Goal

To facilitate interaction between users and multi-agent systems (MAS) through an intuitive and responsive web interface, allowing control and monitoring of IoT devices using KQML commands.

## Features

### Main Characteristics

- **Responsive Interface**: Adaptive design for desktop, tablet, and mobile devices
- **Light/Dark Theme**: Theme toggle with automatic system preference detection
- **QR Code Reading**: Integrated scanner for quick setup via QR Code (mobile)
- **Real-Time Chat**: Chat interface for communication with intelligent agents
- **KQML Protocol**: Full support for tell, askOne, askAll, tellHow, and achieve commands
- **Agent Monitoring**: Data and status visualization of the connected agent
- **Predefined Actions**: List of common KQML commands for ease of use
- **Data Persistence**: Local storage of connection settings

### Technologies Used

#### Frontend

- **Next.js 15**: React framework with App Router
- **TypeScript**: Static typing for more robustness
- **Material-UI (MUI) 5.15**: React component library
- **Tailwind CSS**: Utility-first CSS framework

#### Specific Functionalities

- **html5-qrcode**: QR code reading via camera
- **cookies-next**: Cookie management

## System Architecture

![Application Architecture](./docs/images/ContextNet-chat



### Project Structure

```
contextnet-app/
├── app/                    # Next.js App Router
│   ├── chat/              # Chat page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Main layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Base components (shadcn/ui)
│   ├── agent-data.tsx    # Agent data display
│   ├── chat-input.tsx    # Chat input with KQML
│   ├── chat-interface.tsx # Main chat interface
│   ├── footer.tsx        # Application footer
│   ├── landing-page.tsx  # Login/setup page
│   ├── message-bubble.tsx # Message bubbles
│   ├── mode-toggle.tsx   # Theme toggler
│   ├── qr-scanner.tsx    # QR code scanner
│   ├── snackbar-provider.tsx # Notification provider
│   └── theme-provider.tsx # Theme provider
├── contexts/             # React contexts
│   └── key-context.tsx   # Connection data context
├── hooks/                # Custom hooks
│   ├── use-hydration.ts  # Hydration hook
│   ├── use-mobile.ts     # Mobile device detection
│   └── use-toast.ts      # Notification hook
├── lib/                  # Utilities
│   └── utils.ts          # Helper functions
└── public/               # Static files
```

## Installation and Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/gustavoxav/AgentChat.git
cd agentchat
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Project

#### Development

```bash
npm run dev
# or
yarn dev
```

#### Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

### 4. Access the Application

- **Development**: [http://localhost:3000](http://localhost:3000)
- **Production**: [https://agent-chat-iota.vercel.app](https://agent-chat-iota.vercel.app)

## How to Use

### 1. Initial Setup

1. Access the application
2. Fill in the connection data:
   - **ContextNet Network IP**: ContextNet server address
   - **Port**: Communication port (default: 5500)
   - **Agent UUID**: Unique agent identifier
   - **User UUID**: Unique user identifier (auto-generated)

### 2. Setup via QR Code (Mobile)

1. Tap "Read QR Code"
2. Point the camera at the QR code
3. The data will be filled automatically

**QR Code Format:**

```json
{
  "ip": "192.168.1.100",
  "porta": "5000",
  "uuidAgent": "agent-uuid-here",
  "uuidAPP": "app-uuid-here"
}
```

### 3. Setup via Formatted URL

You can access the app using a custom URL to auto-fill connection and optionally chat data.

**Example URL for connection and message sending:**

```
?rede=skynet.chon.group&porta=5500&UUIDAgente=2ca1ac38-40df-4a3b-b539-4a19df2b42eb&UUIDHumano=auto&forca=achieve&mensagem=teste
```

- `rede`: ContextNet server address
- `porta`: Communication port
- `UUIDAgente`: Unique agent ID
- `UUIDHumano`: Unique user ID (`auto` to generate automatically or provide a UUID)
- `forca`: (Optional) KQML command type to auto-send (`tell`, `askOne`, `askAll`, `tellHow`, `achieve`)
- `mensagem`: (Optional) Message/command to send to the agent

### 4. Communicating with Agents

1. After login, access the chat interface
2. Select KQML command type:
   - **TELL**: Inform the agent of something
   - **ASK**: Request the last record of a given expression
   - **ASKAll**: Request all records of a given expression
   - **TELLHOW**: Teach an expression to the agent
   - **ACHIEVE**: Request an action from the agent
3. Type the command or select a predefined action
4. Send the message and wait for the agent response

### 5. KQML Command Examples

```kqml
Tell:
<mid1,641f18ae-6c0c-45c2-972f-d37c309a9b72,tell,cc2528b7-fecc-43dd-a1c6-188546f0ccbf,numeroDaSorte(63626)>

AskOne:
<mid2,641f18ae-6c0c-45c2-972f-d37c309a9b72,askOne,cc2528b7-fecc-43dd-a1c6-188546f0ccbf,numeroDaSorte(N)>

AskAll:
<mid3,641f18ae-6c0c-45c2-972f-d37c309a9b72,askAll,cc2528b7-fecc-43dd-a1c6-188546f0ccbf,numeroDaSorte(N)>

Achieve:
<mid4,641f18ae-6c0c-45c2-972f-d37c309a9b72,achieve,cc2528b7-fecc-43dd-a1c6-188546f0ccbf,plano(teste)>

TellHow:
<mid5,641f18ae-6c0c-45c2-972f-d37c309a9b72,tellHow,cc2528b7-fecc-43dd-a1c6-188546f0ccbf, "+!ensinamento(J)[source(Origem)] <- .print(\"Recebi o plano: \",J,\" \",Origem).">
```

## Contributing

### How to Contribute

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- **ESLint**: Automatic linting
- **Prettier**: Code formatting
- **TypeScript**: Mandatory typing
- **Conventional Commits**: Commit message standard

## License

This project is under the MIT license. See the [LICENSE](LICENSE) file for details.

## Academic References

1. **KQML Specification**: Knowledge Query and Manipulation Language
2. **Multi-Agent Systems**: Foundations and Applications
3. **IoT Communication Protocols**: A Comprehensive Survey
4. **Human-Computer Interaction**: Design Principles

## Useful Links

- **Production App**: [https://agent-chat-iota.vercel.app/](https://agent-chat-iota.vercel.app/)
- **Backend Repository**: [https://github.com/gustavoxav/contextNetChat-api](https://github.com/gustavoxav/contextNetChat-api)
- **Project Documentation**: [https://]

## Roadmap

### Version 1.1 (Upcoming Features)

- [ ] Conversation history
- [ ] Push notifications
- [ ] Multiple simultaneous agents

## Team

### Developers

- **Name**: Gustavo Xavier Saldanha and Mateus Façanha Lima de Souza
- **Course**: Information Systems
- **Institution**: CEFET/RJ Campus Nova Friburgo
- **Email**: [gustavosaldxav@gmail.com](mailto:gustavosaldxav@gmail.com) and [facanhalima85@gmail.com](mailto:facanhalima85@gmail.com)
- **LinkedIn**: [https://www.linkedin.com/in/gustavosaldxav](https://www.linkedin.com/in/gustavosaldxav) and [https://www.linkedin.com/in/mateusfacanha](https://www.linkedin.com/in/mateusfacanha)

### Advisor

- **Prof. Dr.**: Nilson Mori Lazarin
- **Email**: [nilsonmori@gmail.com](mailto:nilsonmori@gmail.com)

***

<div align="center">
  <p>Developed for the Information Systems final project</p>
  <p>© 2025</p>
</div>
