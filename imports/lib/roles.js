import { USER_ROLES } from "./enums";

export default class CheckRoles {
  constructor(user) {
    this.user = user;
  }

  // object = { page: 'auth', ... }
  check = (object) => {
    if (!object) {
      return false;
    }
    let isCheck = false;

    each(Object.keys(object), (key) => {
      switch (key) {
        case "page": {
          isCheck = this.accessPage(object[key]);
          break;
        }
        default:
          break;
      }
    });
    return isCheck;
  };

  accessPage = (page) => {
    const pages = {
      auth: [USER_ROLES.USER, USER_ROLES.ADMIN],
      home: [USER_ROLES.USER, USER_ROLES.ADMIN],
    };

    return Roles.userIsInRole(this.user._id, pages[page], Roles.GLOBAL_GROUP);
  };
}
