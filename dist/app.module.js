"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const exception_filter_1 = require("./common/filters/exception.filter");
const error_interceptor_1 = require("./common/interceptors/error.interceptor");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const auth_module_1 = require("./modules/auth/auth.module");
const connect_entity_1 = require("./modules/master/entities/connect.entity");
const coupon_entity_1 = require("./modules/master/entities/coupon.entity");
const referral_entity_1 = require("./modules/master/entities/referral.entity");
const connect_module_1 = require("./modules/connect/connect.module");
const recharge_history_entity_1 = require("./modules/connect/entities/recharge-history.entity");
const user_connect_log_entity_1 = require("./modules/connect/entities/user-connect-log.entity");
const user_connect_entity_1 = require("./modules/connect/entities/user-connect.entity");
const user_request_entity_1 = require("./modules/connect/entities/user-request.entity");
const master_module_1 = require("./modules/master/master.module");
const admin_user_entity_1 = require("./modules/user/entities/admin-user.entity");
const otp_entity_1 = require("./modules/user/entities/otp.entity");
const user_about_entity_1 = require("./modules/user/entities/user-about.entity");
const user_basic_entity_1 = require("./modules/user/entities/user-basic.entity");
const user_bio_entity_1 = require("./modules/user/entities/user-bio.entity");
const user_career_entity_1 = require("./modules/user/entities/user-career.entity");
const user_family_background_entity_1 = require("./modules/user/entities/user-family-background.entity");
const user_family_detail_entity_1 = require("./modules/user/entities/user-family-detail.entity");
const user_habit_entity_1 = require("./modules/user/entities/user-habit.entity");
const user_image_entity_1 = require("./modules/user/entities/user-image.entity");
const user_login_entity_1 = require("./modules/user/entities/user-login.entity");
const user_preference_entity_1 = require("./modules/user/entities/user-preference.entity");
const user_religion_entity_1 = require("./modules/user/entities/user-religion.entity");
const user_module_1 = require("./modules/user/user.module");
const user_connect_duration_log_1 = require("./modules/connect/entities/user-connect-duration-log");
const user_connect_duration_entity_1 = require("./modules/connect/entities/user-connect-duration.entity");
const user_profile_visit_1 = require("./modules/user/entities/user.profile.visit");
const connect_transaction_entity_1 = require("./modules/connect/entities/connect-transaction-entity");
const cms_module_1 = require("./modules/cms/cms.module");
const faq_entity_1 = require("./modules/cms/entities/faq.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            common_1.Logger,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'dev.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                host: process.env.DB_HOST,
                type: 'mysql',
                port: 3306,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [
                    user_basic_entity_1.UserBasic,
                    user_about_entity_1.UserAbout,
                    user_habit_entity_1.UserHabit,
                    user_religion_entity_1.UserReligion,
                    user_career_entity_1.UserCareer,
                    user_family_background_entity_1.UserFamilyBackground,
                    user_family_detail_entity_1.UserFamilyDetail,
                    user_bio_entity_1.UserBio,
                    user_image_entity_1.UserImage,
                    admin_user_entity_1.AdminUser,
                    otp_entity_1.Otp,
                    user_login_entity_1.UserLogin,
                    user_preference_entity_1.UserPreference,
                    connect_entity_1.Connect,
                    referral_entity_1.Referral,
                    coupon_entity_1.Coupon,
                    user_connect_entity_1.UserConnect,
                    user_connect_log_entity_1.UserConnectLog,
                    user_request_entity_1.UserRequest,
                    recharge_history_entity_1.RechargeHistory,
                    faq_entity_1.faq,
                    user_connect_duration_log_1.UserConnectDurationLog,
                    user_connect_duration_entity_1.UserConnectDuration,
                    connect_transaction_entity_1.ConnectTransactionEntity,
                    user_profile_visit_1.ProfileVisit
                ],
                synchronize: true,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            master_module_1.MasterModule,
            connect_module_1.ConnectModule,
            cms_module_1.CmsModule
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: error_interceptor_1.ErrorInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map