export type routeMethod = "Create" | "Update" | "Delete" | "Get" | "GetList";

export type RoutesType = {
  [key: string]: {
    [key: string]: {
      route: string | Partial<{ [key in routeMethod]: string }>;
      controller?: string;
    };
  };
};

export const routeMethods: {
  [key in routeMethod]: routeMethod;
} = {
  Create: "Create",
  Update: "Update",
  Delete: "Delete",
  Get: "Get",
  GetList: "GetList",
};

export const routeMethodExpressRouteMapping: {
  [key in routeMethod]: any;
} = {
  Create: "post",
  Update: "put",
  Delete: "delete",
  Get: "get",
  GetList: "get",
};

export const routeMethodsArray: routeMethod[] = Object.values(routeMethods);

export const apiEndPoints: RoutesType = {
  system: {
    // Permission Setup
    layoutType: {
      route: "/layouttypes",
      controller: "layoutTypeController",
    },
    userRole: {
      route: "/userroles",
      controller: "userRoleController",
    },
    module: {
      route: "/modules",
      controller: "moduleController",
    },
    route: {
      route: "/routes",
      controller: "routeController",
    },
    userRolePermission: {
      route: "/userrolepermissions",
      controller: "userRolePermissionController",
    },

    // Class Setup
    academicYear: {
      route: "/academicyears",
      controller: "academicYearController",
    },
    classroom: {
      route: "/classrooms",
      controller: "classroomController",
    },
    course:{
      route: "/courses",
      controller: "courseController",
    },
    courseSem: {
      route: "/coursesems",
      controller: "courseSemController",
    },
    division:{
      route: "/divisions",
      controller: "divisionController",
    },
    department:{
      route: "/departments",
      controller: "departmentController",
    },
    dcyaMapping:{
      route: "/dcyamappings",
      controller: "dcyaMappingController",
    },

    // Paper Setup
    paperType: {
      route: "/papertypes",
      controller: "paperTypeController",
    },
    paper: {
      route: "/papers",
      controller: "paperController",
    },

    // Time Table Setup
    timeSlot: {
      route: "/timeslots",
      controller: "timeSlotController",
    },
    timeTable: {
      route: "/timetables",
      controller: "timeTableController",
    }
  },

  user: {
    userRegistration: {
      route: "/userregistrations",
      controller: "userRegistrationController",
    },
    userLogin: {
      route: { Create: "/login" },
    },
    userLogout: {
      route: { Create: "/logout" },
    },
    refreshToken: {
      route: { Create: "/refreshtoken" },
    },
    userData: {
      route: { Create: "/userdata" },
    },
    userRegister: {
      route: { Create: "/userRegister" },
    },
  },
};
