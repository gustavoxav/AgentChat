import { ChatInterface } from "@/components/chat-interface";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const cookieStore = cookies();
  const connectionData = (await cookieStore).get("connection-data");

  if (!connectionData) {
    redirect("/");
  }

  return <ChatInterface />;
}
