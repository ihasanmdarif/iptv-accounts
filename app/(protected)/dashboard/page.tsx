import { validateRequest } from "@/auth";
import Chat from "@/components/Chat";
import SignOut from "@/components/sign-out";
import { gmailClient } from "@/lib/gmail";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/signin");
  }

  const getEmails = async () => {
    const messagesResponse = await gmailClient.users.messages.list({
      userId: user.email,
    });
    const messages = messagesResponse.data.messages;
    console.log("messages =========>  ", messages);
  };
  getEmails();
  return (
    <div>
      <h1>Dashboard</h1>
      <Chat />
      <SignOut />
    </div>
  );
};
export default DashboardPage;
