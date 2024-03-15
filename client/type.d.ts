type Children = {
  children: React.ReactNode
}

type FormSignupValues = {
  username: string
  surname: string
  email: string
  password: string
  customError: null
}

type FormLoginValues = Omit<FormSignupValues, 'username' | 'surname'>

type ErrorMessage = {
  children: React.ReactNode
}

type NavItem = {
  title: string
  path: string
  icon: string
}

type SettingCategory = NavItem & {}
type FriendCategory = NavItem & {}
type NavItems = { navItems: NavItem[] }
type NavState = { addition: boolean }

type SettingCategorie = {
  title?: string
  desc?: string
}

type EditProfile = {
  meId: string
  avatar: FileList
  username: string
  surname: string
  email: string
  password: string
  desc: string
}

type Params = {
  params: {
    id: string
  }
}

type ReduxUserData = {
  userData: UserData
}

type UserData = {
  _id: string
  avatar: string
  desc: string
  username: string
  surname: string
  email: string
}

type UserProfile = Omit<UserData, 'email'>

type UserId = {
  userId: string
}

type TabsCategorie = {
  title: string
  icon: string
}

type UserStatistic = {
  infos: {
    posts: string[]
    subs: string[]
    friends: string[]
    friendsReq: string[]
  }
}

type Preview = {
  path: string
  type: string
}

type CreatorPost = {
  onClose?: () => void
}

type FormValues = {
  files: FileList
  content: string
}

type CreatingPostProps = {
  files: File[]
  content: string
  id: string
  onClose: any
  setIsLoading: (IsLoading: boolean) => void
}

type Post = {
  _id: string
  creator: {
    _id: string
    avatar: string
    username: string
    surname: string
  }
  files: { type: string; path: string }[]
  content: string
  usersSaved: string[]
  usersLiked: string[]
  comments: PostComment[]
  createdAt: Date
}

type PostComment = {
  _id: string
  user: Omit<UserData, 'email' | 'desc'>
  text: string
  like: string[]
  createdAt: Date
}

type UIModal = {
  children: React.ReactNode
  module: React.ReactElement<
    {
      onClose: () => void
    },
    string | React.JSXElementConstructor<any>
  >
}

type ModalSchema = {
  isView: boolean
  onClose: () => void
  module: React.ReactElement<
    {
      onClose: () => void
    },
    string | React.JSXElementConstructor<any>
  >
}

type PropsPost = {
  post: Post
  onClose?: () => void
  module?: React.ReactElement<
    {
      onClose: () => void
    },
    string | React.JSXElementConstructor<any>
  >
}

type PropsUserId = {
  userId: string
}

type PropsPostId = {
  postId: string
}

type PtopsPostComment = {
  postId: string
  content: string
}

type PropsAddComment = {
  meId: string
  postId: string
  content: string
}

type ControllerFormValues = {
  content: string
}

type User = UserData & {
  infos: {
    subs: string[]
    friendsReq: string[]
    friends: string[]
  }
}

type UIAccordion = {
  accordionPages: NavItem[]
}

type PropsUserSchema = {
  user: User
  meId: string
  QSubscribe: (userId: string, meId: string) => void
  QUnsubscribe: (userId: string, meId: string) => void
  QFriendReq: (userId: string, meId: string) => void
  QRecallFriend: (userId: string, meId: string) => void
}

type FriendFormValue = {
  fullName: string
}

type TapeItem = {
  post: Post
  meId: string
  likePost: (meId: string, postId: string) => void
  dislikePost: (meId: string, postId: string) => void
  savePost: (meId: string, postId: string) => void
  losePost: (meId: string, postId: string) => void
}

type Chat = {
  _id: string
  users: chatUser[]
  messages: Message[]
}

type ChatUser = Omit<UserData, 'desc' | 'email'>
type User = Omit<UserData, 'email'> & {
  infos: {
    subs: string[]
    friendsReq: string[]
  }
}
type Companion = ChatUser & {}

type Message = {
  creator: ChatUser
  userId: string
  room: string
  content: string
  createAt: Data
}

type PropsMessage = {
  message: Message
  meData: UserData
}

type ChatFormValues = {
  text: string
}

type UIPopup = {
  message: Message | null | undefined
  path: string
  closePopup: () => void
}

type TestUserValues = {
  username: string
  surname: string
  email: string
  password: string
}

type UIButtonProps = {
  data_cy_name?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  color?: string
  padding?: string
  background?: string
  borderRadius?: string
}

type UISlider = {
  graphics: Preview[]
  isFromServer?: boolean
  cleanBtn?: boolean
  onClean?: () => void
}
