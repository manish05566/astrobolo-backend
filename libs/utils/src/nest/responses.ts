interface AppResponseType {
  data?: any;
  message?: string;
  [key: string]: any; // Add index signature to allow arbitrary properties
}

const success = (res: AppResponseType) => {
  return {
    status: true,
    message: res.message || null,
    data: res.data,
    ...res, // Spread the additional properties
  };
};

const failed = (res: AppResponseType) => {
  return {
    status: false,
    message: res.message || null,
    data: res.data,
    ...res, // Spread the additional properties
  };
};

const messages = {
  success: "Success",
  failed: "Failed",
  recordInserted: "Record has been inserted successfully",
  recordUpdated: "Record has been updated successfully",
  recordFound: "Record found successfully",
  choiceArr:
    "User's assessment answers array is empty. Please provide a proper response, including the question ID or choice ID.",
  recordNotFound: "Record not found",
  activityNotFound: "Activity not found",
  interventionNotFound: "Intervention not found",
  slugPlatform: "Both 'Slug' and 'Platform' are required!",
  catIdNotFound: "Category id not found",
  recordDeleted: "Record deleted successfully",
  somethingWentWrong: "Something went wrong!",
  idNotFound: "ID not found!",
  Invalid: "Invalid ID provided",
  InvalidFolk: "Invalid expert id provided",
  deviceId: "Device ID is missing in the request headers",
  missingApp: "App, platform, and country are required in the headers.",
  missingAppPlatform: "Platform is missing from the headers.",
  deviceIdNotFound: "Device ID not found!",
  firebaseToken: "Firebase token has expired!",
  refreshTokenUsed: "Refresh token has already been used!",
  queryParam: "Query parameter(s) missing from URL",
  restartChat: "Conversation restarted.",
  notStarted: "Conversation has not started yet!",
  messageLimit: "You can send a message of up to 1000 characters.",
  ownMessageReact: "You cannot react to your own message.",
  expertMessage: "Expert message id is wrong",
  alreadyClaimed: "You have already claimed ! ",
  fileSizeExceed: "You can upload an image up to 500 KB!",
  accountDeleted: "Account deleted successfully!",
  logout: "Logout successfully!",
  auth: {
    registered: "Email already registered",
    notRegistered: "Email not registered",
    otpSend: "OTP has been sent to your mobile number",
    otpExpired: "OTP has been expired",
    otpInvalid: "OTP is incorrect! Please retry",
    featureExist: "Feature already exist!",
    maxReach: "Maximum OTP attempts reached.",
  },
  message: {
    notFound: "Message not found!",
    feedback: "Feedback updated.",
    feedbackInactive: "Feedback is not active!",
    noRecord: "No record found before the given message",
    notUpdate: "No message updated",
    noEnergy: "You have no energy to do conversation!",
  },
  conversations: {
    notFound: "Conversations not found!",
    restartConversations: "Restart your conversations",
    exist: "Conversation already exists.",
  },
  rewards: {
    ads: "Ads rewads is not active!",
    icode: "Icode rewads is not active!",
    useNotOwn: "You cannot use your own invitation code.",
    invailidReferral: "You cannot use your own invitation code.",
    hours_elapse_24:
      "Reward has been granted for the day. Please try again after 24 hours elapse",
  },
  customBot: {
    notFound: "No record founds!",
    noBotFound: "No such bot found!",
    botId: "Expert not found!",
    botExsit: "Expert creation limit exceeded in the selected category.",
  },
  questions: {
    notFound: "No record founds!",
    updated: "Data updated successfully",
  },
  utilities: {
    notFound: "No record founds for this model in utilities!",
  },
  folk: {
    notFound: "Expert not found!",
    notDelete:
      "You cannot delete the expert as it is associated with an conversations or task !",
  },
  task: {
    notFound: "Task not found!",
  },
  user: {
    notFound: "User id not found!",
    selectedCategory: "At least one category must be selected.!",
    userNotFound: "User not found!",
  },
  category: {
    notUpdate:
      "You cannot update the app because it is associated with an expert !",
    notDelete:
      "You cannot delete the category as it is associated with an expert or task !",
    notFound: "Category id not found!",
  },
  upload: {
    fileNotFound: "File not found, Please select a file for upload !",
    imageAllowed: "Only image files are allowed!",
  },
};

export const AppResponse = {
  success,
  failed,
  messages,
};
