"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("../../shared/shared.module");
const connect_module_1 = require("../connect/connect.module");
const connect_repo_1 = require("../connect/connect.repo");
const connect_service_1 = require("../connect/connect.service");
const connect_transaction_entity_1 = require("../connect/entities/connect-transaction-entity");
const recharge_history_entity_1 = require("../connect/entities/recharge-history.entity");
const user_connect_duration_log_1 = require("../connect/entities/user-connect-duration-log");
const user_connect_duration_entity_1 = require("../connect/entities/user-connect-duration.entity");
const user_connect_log_entity_1 = require("../connect/entities/user-connect-log.entity");
const user_connect_entity_1 = require("../connect/entities/user-connect.entity");
const user_request_entity_1 = require("../connect/entities/user-request.entity");
const master_module_1 = require("../master/master.module");
const admin_user_entity_1 = require("./entities/admin-user.entity");
const otp_entity_1 = require("./entities/otp.entity");
const user_about_entity_1 = require("./entities/user-about.entity");
const user_basic_entity_1 = require("./entities/user-basic.entity");
const user_bio_entity_1 = require("./entities/user-bio.entity");
const user_career_entity_1 = require("./entities/user-career.entity");
const user_docs_entity_1 = require("./entities/user-docs.entity");
const user_family_background_entity_1 = require("./entities/user-family-background.entity");
const user_family_detail_entity_1 = require("./entities/user-family-detail.entity");
const user_habit_entity_1 = require("./entities/user-habit.entity");
const user_image_entity_1 = require("./entities/user-image.entity");
const user_login_entity_1 = require("./entities/user-login.entity");
const user_preference_entity_1 = require("./entities/user-preference.entity");
const user_religion_entity_1 = require("./entities/user-religion.entity");
const user_profile_visit_1 = require("./entities/user.profile.visit");
const user_controller_1 = require("./user.controller");
const user_facade_1 = require("./user.facade");
const user_repo_1 = require("./user.repo");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => master_module_1.MasterModule),
            common_1.forwardRef(() => shared_module_1.SharedModule),
            common_1.forwardRef(() => connect_module_1.ConnectModule),
            jwt_1.JwtModule.register({
                secret: "MakeyMyMarry123####",
                signOptions: { expiresIn: '1800s' }
            }),
            typeorm_1.TypeOrmModule.forFeature([
                user_basic_entity_1.UserBasic,
                user_about_entity_1.UserAbout,
                user_habit_entity_1.UserHabit,
                user_religion_entity_1.UserReligion,
                user_career_entity_1.UserCareer,
                user_family_background_entity_1.UserFamilyBackground,
                user_family_detail_entity_1.UserFamilyDetail,
                user_bio_entity_1.UserBio,
                user_image_entity_1.UserImage,
                user_docs_entity_1.UserDocs,
                admin_user_entity_1.AdminUser,
                otp_entity_1.Otp,
                user_login_entity_1.UserLogin,
                user_preference_entity_1.UserPreference,
                user_request_entity_1.UserRequest,
                user_connect_entity_1.UserConnect,
                user_connect_log_entity_1.UserConnectLog,
                recharge_history_entity_1.RechargeHistory,
                user_connect_duration_log_1.UserConnectDurationLog,
                user_connect_duration_entity_1.UserConnectDuration,
                connect_transaction_entity_1.ConnectTransactionEntity,
                user_profile_visit_1.ProfileVisit,
                Notification
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_facade_1.UserFacade, user_service_1.UserService, user_repo_1.UserRepo, connect_service_1.ConnectService, connect_repo_1.ConnectRepo, Notification],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map