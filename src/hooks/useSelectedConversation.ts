import { useConversation, type CachedConversation } from "@xmtp/react-sdk";
import { useEffect, useState } from "react";
import { useXmtpStore } from "../store/xmtp";

const useSelectedConversation = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    CachedConversation | undefined
  >();
  const { getCachedByTopic } = useConversation();
  const conversationTopic = useXmtpStore((state) => state.conversationTopic);

  useEffect(() => {
    const getSelectedConversation = async () => {
      if (conversationTopic) {
        const conversation = await getCachedByTopic(conversationTopic);
        setSelectedConversation(conversation);
      }
    };
    void getSelectedConversation();
  }, [conversationTopic, getCachedByTopic]);

  return selectedConversation;
};

export default useSelectedConversation;
