import SolutionCard from "./SolutionCard";

import translationImage from "../../assets/home/solution/Solution_translation.png";
import conversationImage from "../../assets/home/solution/Solution_conversation.png";
import middoCallImage from "../../assets/home/solution/Solution_middocall.png";
import extensionImage from "../../assets/home/solution/Solution_extension.png";

const Solution = () => {
  const solutions = [
    {
      title: "Translation",
      description:
        "Middo provides an ESL translation method to guarantee a high-accuracy translate.",
      icon: translationImage,
      features: [
        "Support more than 30 languages",
        "Speech-to-text input support",
        "More than 100+ example phrase of all situations",
        "Save and share your translated easily",
      ],
    },
    {
      title: "Conversation",
      description:
        "All-in-one conversation platform that integrated Middo translation that could help you have unlimited connections with everyone around the world.",
      icon: conversationImage,
      features: [
        "Integrated Middo translation",
        "Video & Audio call that support for your work",
        "Feel free to use your native language to speak with foreign one",
        "Sharing files easily",
      ],
    },
    {
      title: "Middo Call",
      description:
        "Middo Call is one of the most fantastic feature of Middo Conversation that could support your work more easily.",
      icon: middoCallImage,
      features: [
        "Support screen sharing",
        "Live translated captions",
        "Save all your discussion through call",
        "Support on all devices",
      ],
    },
    {
      title: "Extension",
      description:
        "Transform your website with Middo Extension in just a few clicks. Capture leads, provide real-time support, and boost your business – all within your website.",
      icon: extensionImage,
      features: [
        "Integrated Mobile conversation",
        "Easily manage clients list",
        "Show your business with a powerful report tool",
        "Create your own script for any conversation with clients",
      ],
    },
  ];

  return (
    <section
      id="solutions"
      className="flex flex-col gap-15 p-[60px] bg-gray-50"
    >
      {solutions.map((solution, index) => (
        <SolutionCard key={index} {...solution} />
      ))}
    </section>
  );
};

export default Solution;
