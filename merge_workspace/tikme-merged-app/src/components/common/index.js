// Common Components Export

// Loading States
export {
  PageLoader,
  InlineLoader,
  CardSkeleton,
  ListSkeleton,
  TextSkeleton,
  ProgressLoader,
  PulseLoader,
  ToolLoader,
  ConnectingLoader
} from './LoadingStates'

// Error Boundary
export {
  default as ErrorBoundary,
  ToolErrorBoundary,
  PageErrorBoundary
} from './ErrorBoundary'

// Empty States
export {
  EmptyState,
  NoStudentsState,
  NoResultsState,
  NoDataState,
  SelectToolState,
  NoGroupsState,
  NoMessagesState,
  PollNotStartedState,
  QuizNotStartedState,
  OfflineState,
  ComingSoonState,
  PermissionDeniedState
} from './EmptyStates'

// Tooltips
export {
  default as Tooltip,
  InfoTooltip,
  ButtonTooltip,
  StatusTooltip
} from './Tooltip'

// Icons (Phase 4D)
export {
  default as Icon,
  IconButton,
  ToolIcon,
  StatusIcon,
  IconBadge,
  AnimatedIcon,
  EmojiIcon,
  TeachingToolIcons,
  StatusIcons
} from './Icon'

// Smart Text (Phase 4D)
export {
  default as SmartText,
  VietnameseName,
  StudentNameDisplay,
  AutoHeading,
  JapaneseText,
  TruncateWithTooltip,
  ResponsiveText,
  GoldenLabel
} from './SmartText'
