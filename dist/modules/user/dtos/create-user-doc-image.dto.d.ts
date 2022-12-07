export declare class CreateUserDocImageDto {
    imageUrl: string;
    isDefault: boolean;
}
export declare class CreateUserDocumentImageDto {
    userBasicId: string;
    idProof: string;
    userDocImages: CreateUserDocImageDto[];
}
export declare class UpdateUserDocsDto {
    userBasicId: string;
}
