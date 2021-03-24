interface ExternalUrls {
    spotify: string;
}

interface Followers {
    href?: any;
    total: number;
}

interface Image {
    height?: any;
    url: string;
    width?: any;
}

export interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}