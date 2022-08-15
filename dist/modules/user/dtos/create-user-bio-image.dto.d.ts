export declare class CreateUserImageDto {
    imageUrl: string;
    isDefault: boolean;
}
export declare class CreateUserBioImageDto {
    userBasicId: string;
    aboutMe: string;
    userImages: CreateUserImageDto[];
}
