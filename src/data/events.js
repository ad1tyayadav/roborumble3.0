import { 
    Cpu, 
    Bot, 
    Gamepad2, 
    Mic, 
    Rocket, 
    Magnet, 
    Briefcase,
    Shield,
    Trophy,
    Zap
} from "lucide-react";
import { BiFootball } from "react-icons/bi";

export const events = [
  {
    id: "robo-obstacle",
    title: "ROBO OBSTACLE",
    category: "Robotics",
    icon: Zap,
    prize: "₹20K",
    teamSize: "2-5 Members",
    desc: "Robo Obstacle Race challenges participants to design robots capable of navigating through a track filled with obstacles such as ramps, pits, turns, and barriers within the shortest possible time.",
    rules: [
      "Maximum of 5 members per team.",
      "The robot must be within specified dimensions (typically 30cm x 30cm x 30cm).",
      "No external interference once the run starts.",
      "Points deducted for every obstacle hit.",
      "Fastest completion time wins."
    ],
    image: "/images/robo-race.jpeg"
  },
  {
    id: "robo-soccer",
    title: "ROBO SOCCER",
    category: "Robotics",
    icon: BiFootball,
    prize: "₹20k",
    teamSize: "3-5 Members",
    desc: "Robo-Soccer is an exciting robotics competition in which teams build and control robots to play a soccer-style match inside a defined arena.",
    rules: [
      "Teams must consist of 3-5 members.",
      "Two robots from each team on the field at once.",
      "Standard soccer rules apply with modifications for robotics.",
      "Direct manual control or autonomous systems are allowed.",
      "Match duration: 10 minutes (5 min each half)."
    ],
    image: "/images/robo-soccer.jpeg"
  },
  {
    id: "pick-place",
    title: "PICK & PLACE",
    category: "Robotics",
    icon: Magnet,
    prize: "₹20K",
    teamSize: "2-5 Members",
    desc: "Design and build robots capable of picking up blocks and strategically placing them to construct a temporary bridge to cross obstacles.",
    rules: [
      "Robot must be wired or wireless controlled.",
      "Objects must be placed within the target zone.",
      "Stability of the constructed bridge is critical.",
      "Time limit: 8 minutes.",
      "Weight limit for the robot: 5kg."
    ],
    image: "/images/pick-place.jpeg"
  },
  {
    id: "aeromodelling",
    title: "AEROMODELLING",
    category: "Aerial",
    icon: Rocket,
    prize: "₹20k",
    teamSize: "3-5 Members",
    desc: "Participants design, build, and fly remote-controlled aircraft, evaluating flight stability, control accuracy, and design efficiency.",
    rules: [
      "Aircraft must be designed/built by the team.",
      "Evaluation based on both flight performance and design documentation.",
      "Safety protocols must be followed strictly.",
      "Maneuvers: takeoff, 360-degree turn, landing.",
      "Payload carrying capacity is a bonus factor."
    ],
    image: "/images/aeromodelling.jpeg"
  },
  {
    id: "e-sports",
    title: "E-SPORTS",
    category: "Gaming",
    icon: Gamepad2,
    prize: "₹10K",
    teamSize: "Squad / Solo",
    desc: "Competitive gaming event emphasizing strategy, coordination, and quick decision-making in popular multiplayer video games.",
    rules: [
      "Fair play and sportsmanship are mandatory.",
      "Tournament brackets decided on the spot.",
      "Use of external hacks or scripts results in immediate DQ.",
      "Bring your own peripherals (optional/allowed).",
      "Decision of the marshals is final."
    ],
    image: "/images/e-sports.jpeg"
  },
  {
    id: "robo-war",
    title: "ROBO WAR",
    category: "Robotics",
    icon: Shield,
    prize: "₹20k",
    teamSize: "3-5 Members",
    desc: "Battle against each other inside a closed arena. Disable, immobilize, or push the opponent out to dominate.",
    rules: [
      "Robot must fit weight categories (Light/Heavy).",
      "No liquid projectiles or flame weapons.",
      "Match duration: 3 minutes.",
      "Points for aggression, control, and damage.",
      "A robot is 'dead' if it stops moving for 30 seconds."
    ],
    image: "/images/robo-war.jpeg"
  },
  {
    id: "defence-talk",
    title: "DEFENCE TALK",
    category: "Seminar",
    icon: Mic,
    prize: "Participation Certificate",
    teamSize: "Individual",
    desc: "Expert-led session by Major General G.D. Bakshi (Retd.) on advancements in defence systems and national security.",
    rules: [
       "Pre-registration required for attendance.",
       "Interactive Q&A session after the talk.",
       "Certificates provided for registered attendees.",
       "Maintain decorum during the session.",
       "Venue: Main Auditorium."
    ],
    image: "/images/Defence-talk.jpeg"
  },
  {
    id: "defence-expo",
    title: "DEFENCE EXPO",
    category: "Exhibition",
    icon: Briefcase,
    prize: "Showcase Only",
    teamSize: "Open for All",
    desc: "Exhibition showing modern defence technologies, weapons, and drones used by armed forces.",
    rules: [
      "Guided tours available every hour.",
      "Photos allowed only in designated areas.",
      "Don't touch the sensitive equipment.",
      "Entry through valid techfest ID.",
      "Venue: Main Ground."
    ],
    image: "/images/Defence-expo.jpeg"
  },
  {
    id: "line-follower",
    title: "LINE FOLLOWER",
    category: "Robotics",
    icon: Bot,
    prize: "₹10k",
    teamSize: "2-5 Members",
    desc: "Autonomous robots capable of following a predefined path marked by a line with maximum accuracy and speed.",
    rules: [
      "Robot must be fully autonomous.",
      "Calibration allowed only before the run.",
      "Track includes curves, intersections, and gaps.",
      "Two attempts allowed per robot.",
      "Width of the line: 2.5cm."
    ],
    image: "/images/line-following-robot.jpeg"
  }
];
