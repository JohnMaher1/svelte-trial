export type Product = {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	dimensions: Dimensions;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: Review[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: Meta;
	thumbnail: string;
	images: string[];
};

export type Dimensions = {
	width: number;
	height: number;
	depth: number;
};

export type Review = {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
	reviewerEmail: string;
};

export type Meta = {
	createdAt: string;
	updatedAt: string;
	barcode: string;
	qrCode: string;
};

export type CartProduct = {
	product: Product;
	quantity: number;
	id: string;
};

export interface UserMetadata {
	avatar_url: string;
	custom_claims: {
		global_name: string;
	};
	email: string;
	email_verified: boolean;
	full_name: string;
	iss: string;
	name: string;
	phone_verified: boolean;
	picture: string;
	provider_id: string;
	sub: string;
}

export interface AppMetadata {
	provider: string;
	providers: string[];
}

export interface AuthenticationMethod {
	method: string;
	timestamp: number;
}

export interface AuthObject {
	iss: string;
	sub: string;
	aud: string;
	exp: number;
	iat: number;
	email: string;
	phone: string;
	app_metadata: AppMetadata;
	user_metadata: UserMetadata;
	role: string;
	aal: string;
	amr: AuthenticationMethod[];
	session_id: string;
	is_anonymous: boolean;
}
