export declare class CreateUserImageDto {
    imageUrl: string;
    isDefault: boolean;
}
export declare class CreateUserImageDocsDto {
    imageUrl: string;
    idProof: string;
    isDefaultImage: boolean;
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
