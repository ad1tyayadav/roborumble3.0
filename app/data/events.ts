import { Shield, Zap, Users, Bot, Magnet, Mic, Rocket, Gamepad2, Cpu } from "lucide-react";
import { BiFootball } from "react-icons/bi";

export const events = [
    {
      id: "robo-wars",
      title: "Robo Wars",
      category: "Robotics",
      icon: Shield,
      desc: "The ultimate battle of steel and strategy. Build a remote-controlled bot to survive the arena.",
      teamSize: "3-5 Members",
      prize: "₹20,000",
      rules: ["Width: Not More Than 45cm.", "Length: Not More Than 45cm", "Max weight: 6kg (+10% penalty limit).", "No explosives or flammable liquids."],
      image: "/robo-war.jpeg",
      cost: 500
    },
    {
      id: "line-following",
      title: "Line Following Bot",
      category: "Robotics",
      icon: Zap,
      desc: "Speed and precision. Program your bot to follow the twisted path in the shortest time.",
      teamSize: "3-5 Members",
      prize: "₹15,000",
      rules: ["Autonomous robots only.", "Dimensions: 30x30x30 cm Max.", "Onboard batteries only (External Prohibited)."],
      image: "/line-following-robot.jpeg",
      cost: 300
    },
    {
      id: "robo-soccer",
      title: "Robo Soccer",
      category: "Robotics",
      icon: BiFootball,
      desc: "The Fifa of Robotics. Design bots to outmaneuver and outscore your opponents.",
      teamSize: "2-4 Members",
      prize: "₹20,000",
      rules: ["Max Dimensions: 30x30x30 cm.", "Max Weight: 5kg.", "Dribbling mechanisms permitted under specific conditions."],
      image: "/robo-soccer.jpeg",
      cost: 400
    },
    {
      id: "rc-flying",
      title: "RC Flying",
      category: "Aerial",
      icon: Cpu,
      desc: "Navigate obstacles at breakneck speeds. Test your piloting skills.",
      teamSize: "Individual / Team of 2",
      prize: "₹20,000",
      rules: ["Fixed-wing aircraft only.", "Wingspan Max: 1.5m.", "Handmade models only (RTF Prohibited).", "Electric motors only."],
      image: "/rc flying.jpeg",
      cost: 400
    },
    {
      id: "project-expo",
      title: "Project Expo",
      category: "Innovation",
      icon: Users,
      desc: "Showcase your hardware or software projects to industry experts.",
      teamSize: "1-4 Members",
      prize: "₹10,000",
      rules: ["Working prototype required.", "Technical presentation mandatory.", "Live Q&A with industry judges."],
      image: "/exhibition.jpeg",
      cost: 250
    },
    {
      id: "robo-obstacle-race",
      title: "Robo Obstacle Race",
      category: "Robotics",
      icon: Bot,
      desc: "A thrilling challenge where robots must navigate and overcome a series of obstacles, testing speed, control, and mechanical efficiency.",
      teamSize: "3-5 Members",
      prize: "₹20,000 Pool",
      rules: ["Dimensions: 30x30x25 cm Max.", "Weight: Max 2kg (+5% tolerance).", "Power: Electric only, Max 12V DC.", "Wired (15m cable) or Wireless allowed."],
      image: "/robo-race.jpeg",
      cost: 300
    },
    {
      id: "pick-and-drop",
      title: "Pick and Drop Challenge",
      category: "Robotics",
      icon: Magnet,
      desc: "A task-based challenge where robots must accurately pick objects from designated zones and place them at target locations, testing precision, control, and efficiency.",
      teamSize: "3-5 Members",
      prize: "₹20,000 Pool",
      rules: ["Dimensions: 30x30x30 cm Max.", "Weight: Max 5kg.", "Power: Electric only, Max 12V DC.", "Must use Gripper/Claw/Magnet/Suction.", "Time limit: 15 minutes."],
      image: "/pick-place.jpeg",
      cost: 300
    },
    {
      id: "defence-talk",
      title: "Defence Talk",
      category: "Seminar",
      icon: Mic,
      desc: "An informative session exploring modern defense technologies, strategies, and career opportunities in the defense sector.",
      teamSize: "Open to All",
      prize: "Certificate",
      rules: ["Discipline mandatory.", "Q&A in designated time only.", "No recording without permission."],
      image: "/defence-talk.jpeg",
      cost: 0
    },
    {
      id: "defence-expo",
      title: "Defence Expo",
      category: "Exhibition",
      icon: Rocket,
      desc: "An exhibition showcasing defense technologies, equipment, innovations, and student-led defense projects.",
      teamSize: "Individual / Team",
      prize: "Certificate",
      rules: ["Setup within allotted time.", "Safe handling of exhibits.", "Misconduct leads to strict action."],
      image: "/defence-expo.jpeg",
      cost: 0
    },
    {
      id: "e-sports",
      title: "E-SPORTS",
      category: "Gaming",
      icon: Gamepad2,
      desc: "Competitive digital arena. Feature titles: BGMI and FREE FIRE. Squad-based combat.",
      teamSize: "4 Members (Squad)",
      prize: "₹10,000 Pool",
      rules: ["Squad Mode only.", "No iPads/Tablets/Emulators allowed.", "Registered IDs must remain consistent."],
      image: "/e-sports.jpeg",
      cost: 200
    },
];
