import { IUser } from "@/types/types";

const sampleConversations = [
  {
    convoId: "1",
    username: "alice",
    firstName: "Alice",
    lastName: "Johnson",
    profilePicUrl: "https://i.pravatar.cc/150?img=1",
    timestamp: "2024-06-29T07:24:51.503+00:00",
    lastMessage:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum quaerat quia fuga reprehenderit, amet enim esse animi laudantium? Architecto labore itaque exercitationem debitis non eius harum, molestias nihil cumque expedita!",
  },
  {
    convoId: "2",
    username: "bob",
    firstName: "Bob",
    lastName: "Smith",
    profilePicUrl: "https://i.pravatar.cc/150?img=2",
    timestamp: "2024-06-28T12:30:25.503+00:00",
    lastMessage:
      "Quisquam necessitatibus ullam, fugiat dolorum officiis commodi quibusdam temporibus aperiam ad!",
  },
  {
    convoId: "3",
    username: "charlie",
    firstName: "Charlie",
    lastName: "Brown",
    profilePicUrl: "https://i.pravatar.cc/150?img=3",
    timestamp: "2024-06-27T09:15:42.503+00:00",
    lastMessage:
      "Voluptatem obcaecati molestias officiis quos doloremque quod aperiam, eaque reiciendis explicabo.",
  },
  {
    convoId: "4",
    username: "david",
    firstName: "David",
    lastName: "Miller",
    profilePicUrl: "https://i.pravatar.cc/150?img=4",
    timestamp: "2024-06-26T14:40:33.503+00:00",
    lastMessage:
      "Officiis recusandae expedita ullam alias beatae veniam pariatur doloribus non fugiat.",
  },
  {
    convoId: "5",
    username: "eva",
    firstName: "Eva",
    lastName: "Davis",
    profilePicUrl: "https://i.pravatar.cc/150?img=5",
    timestamp: "2024-06-25T17:20:50.503+00:00",
    lastMessage:
      "Deleniti neque quod sit, velit exercitationem reprehenderit cupiditate accusantium. Tempora, facilis.",
  },
  {
    convoId: "6",
    username: "frank",
    firstName: "Frank",
    lastName: "Garcia",
    profilePicUrl: "https://i.pravatar.cc/150?img=6",
    timestamp: "2024-06-24T20:05:12.503+00:00",
    lastMessage:
      "Ipsum doloremque fugit natus modi, amet voluptas accusamus tempora veniam expedita.",
  },
  {
    convoId: "7",
    username: "grace",
    firstName: "Grace",
    lastName: "Martinez",
    profilePicUrl: "https://i.pravatar.cc/150?img=7",
    timestamp: "2024-06-23T22:50:45.503+00:00",
    lastMessage:
      "Voluptatibus alias beatae nemo dolore maxime reiciendis saepe officia delectus?",
  },
  {
    convoId: "8",
    username: "hank",
    firstName: "Hank",
    lastName: "Robinson",
    profilePicUrl: "https://i.pravatar.cc/150?img=8",
    timestamp: "2024-06-22T19:30:55.503+00:00",
    lastMessage:
      "Commodi distinctio magnam quam corporis aspernatur rem, suscipit illum alias.",
  },
  {
    convoId: "9",
    username: "ivy",
    firstName: "Ivy",
    lastName: "Clark",
    profilePicUrl: "https://i.pravatar.cc/150?img=9",
    timestamp: "2024-06-21T16:45:28.503+00:00",
    lastMessage:
      "Veritatis eligendi eos nihil nesciunt saepe nulla repudiandae necessitatibus soluta?",
  },
  {
    convoId: "10",
    username: "jack",
    firstName: "Jack",
    lastName: "Rodriguez",
    profilePicUrl: "https://i.pravatar.cc/150?img=10",
    timestamp: "2024-06-20T14:10:32.503+00:00",
    lastMessage:
      "Laboriosam optio iste veniam, odio recusandae dolores necessitatibus quam quos?",
  },
];

export default sampleConversations;

export const sampleUser: IUser = {
  _id: "60d0fe4f5311236168a109ca",
  username: "johndoe",
  firstName: "John",
  lastName: "Doe",
  password: "hashedPassword123!",
  email: "johndoe@example.com",
  dateOfBirth: new Date("1990-01-01"),
  gender: "male",
  isRestricted: false,
  bio: "Avid traveler and photographer. Love to explore new places.",
  profilePicUrl: "https://i.pravatar.cc/150?img=11",
  followers: ["60d0fe4f5311236168a109cb", "60d0fe4f5311236168a109cc"],
  following: ["60d0fe4f5311236168a109cd", "60d0fe4f5311236168a109ce"],
  postsCount: 42,
  likesReceivedCount: 256,
  isPrivate: false,
  blockedByUsers: ["60d0fe4f5311236168a109cf"],
  blockedUsers: ["60d0fe4f5311236168a109d0"],
  createdAt: new Date("2021-06-23T10:24:00.000Z"),
  updatedAt: new Date("2024-06-28T12:00:00.000Z"),
  iat: 1516239022,
  exp: 1516242622,
  location: "New York, NY",
};

type Props = {
  senderId: { _id: string; username: string; profilePicUrl: string };
  message: string;
  timestamp: string;
};

export const sampleMsgData: Props[] = [
  {
    senderId: {
      _id: "60d0fe4f5311236168a109ca",
      username: "alice",
      profilePicUrl: "https://i.pravatar.cc/150?img=1"
    },
    message: "Hello! How are you doing today?",
    timestamp: "2024-07-01T10:15:30.000Z"
  },
  {
    senderId: {
      _id: "60d0fe4f5311236168a109cb",
      username: "bob",
      profilePicUrl: "https://i.pravatar.cc/150?img=2"
    },
    message: "Are we still meeting up for lunch tomorrow?",
    timestamp: "2024-07-01T11:00:45.000Z"
  },
  {
    senderId: {
      _id: "60d0fe4f5311236168a109cc",
      username: "charlie",
      profilePicUrl: "https://i.pravatar.cc/150?img=3"
    },
    message: "Check out this cool new project I'm working on!",
    timestamp: "2024-07-01T12:20:15.000Z"
  },
  {
    senderId: {
      _id: "60d0fe4f5311236168a109cd",
      username: "david",
      profilePicUrl: "https://i.pravatar.cc/150?img=4"
    },
    message: "Don't forget about the team meeting this afternoon.",
    timestamp: "2024-07-01T13:45:00.000Z"
  },
  {
    senderId: {
      _id: "60d0fe4f5311236168a109ce",
      username: "eva",
      profilePicUrl: "https://i.pravatar.cc/150?img=5"
    },
    message: "Can you send me the files by the end of the day?",
    timestamp: "2024-07-01T14:30:22.000Z"
  },
  {
    senderId: {
      _id: "60d0fe4f5311236168a109cf",
      username: "frank",
      profilePicUrl: "https://i.pravatar.cc/150?img=6"
    },
    message: "Looking forward to our weekend trip!",
    timestamp: "2024-07-01T15:05:37.000Z"
  },
  {
    senderId: {
      _id: "60d0fe4f5311236168a109d0",
      username: "grace",
      profilePicUrl: "https://i.pravatar.cc/150?img=7"
    },
    message: "Great job on the presentation today!",
    timestamp: "2024-07-01T16:40:10.000Z"
  },
  {
    senderId: {
      _id: "60d0fe4f5311236168a109d1",
      username: "hank",
      profilePicUrl: "https://i.pravatar.cc/150?img=8"
    },
    message: "I've sent you the document for review.",
    timestamp: "2024-07-01T17:15:55.000Z"
  },
  {
    senderId: {
      _id: "60d0fe4f5311236168a109d2",
      username: "ivy",
      profilePicUrl: "https://i.pravatar.cc/150?img=9"
    },
    message: "Can we reschedule our meeting to next week?",
    timestamp: "2024-07-01T18:20:45.000Z"
  },
  {
    senderId: {
      _id: "60d0fe4f5311236168a109d3",
      username: "jack",
      profilePicUrl: "https://i.pravatar.cc/150?img=10"
    },
    message: "Let's catch up soon!",
    timestamp: "2024-07-01T19:10:30.000Z"
  }
];