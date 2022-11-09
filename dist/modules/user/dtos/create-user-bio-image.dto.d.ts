export declare class CreateUserImageDto {
    imageUrl: string;
    isDefault: boolean;
}
export declare class CreateUserImageDocsDto {
    imageUrl: string;
    isDefault: boolean;
}
export declare class CreateUserBioImageDto {
    userBasicId: string;
    aboutMe: string;
    userImages: CreateUserImageDto[];
}
export declare class UpdateUserDocsDto {
    userBasicId: string;
    userDocs: CreateUserImageDocsDto[];
}
