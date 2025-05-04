import { ChatInterface } from "@/components/chat-interface";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const cookieStore = await cookies();
  const key = cookieStore.get("agent-key");

  if (!key) {
    redirect("/");
  }

  return <ChatInterface />;
}
