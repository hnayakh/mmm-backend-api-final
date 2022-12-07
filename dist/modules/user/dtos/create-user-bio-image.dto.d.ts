export declare class CreateUserImageDto {
    imageUrl: string;
    isDefault: boolean;
}
export declare class CreateUserImageDocsDto {
    imageUrl: string;
}
export declare class CreateUserBioImageDto {
    userBasicId: string;
    aboutMe: string;
    userImages: CreateUserImageDto[];
}
export declare class UpdateUserDocsDto {
    userBasicId: string;
    idProof: string;
    userDocImages: CreateUserImageDocsDto[];
    userDocs: CreateUserImageDocsDto[];
}
