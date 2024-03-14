import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

export type HomeStackParamList={
    Home:undefined;
    Videos:undefined;
};

export type SearchStackParamList={
    Search:undefined;
};

export type ProfileStackParamList={
    Profile:undefined;
    EditProfile:undefined;
    ManageProfile:undefined;
};

export type AuthStackParamList={
    Login:undefined;
    SignIn:undefined;
    SignUp:undefined;
};

export type MainAppParamList={
    HomeTab:undefined;
    SearchTab:undefined;
    ProfileTab:undefined;
}

export type MovieItem={
    key: string,
};

export interface MovieTileProps {
    movieName:string;
};

export type HomeScreenProps=NativeStackScreenProps<HomeStackParamList,'Home'>;
export type VideosScreenProps=NativeStackScreenProps<HomeStackParamList,'Videos'>;
export type SearchScreenProps=NativeStackScreenProps<SearchStackParamList,'Search'>;
export type ProfleScreenProps=NativeStackScreenProps<ProfileStackParamList,'Profile'>;
export type EditProfleScreenProps=NativeStackScreenProps<ProfileStackParamList,'EditProfile'>;
export type ManageProfleScreenProps=NativeStackScreenProps<ProfileStackParamList,'ManageProfile'>;
export type LoginScreenProps=NativeStackScreenProps<AuthStackParamList,'Login'>;
export type SignInScreenProps=NativeStackScreenProps<AuthStackParamList,'SignIn'>;
export type SignUpScreenProps=NativeStackScreenProps<AuthStackParamList,'SignUp'>;

export type HomeTabScreenProps=MaterialTopTabScreenProps<MainAppParamList,'HomeTab'>;
export type SearchTabScreenProps=MaterialTopTabScreenProps<MainAppParamList,'SearchTab'>;
export type ProfileTabScreenProps=MaterialTopTabScreenProps<MainAppParamList,'ProfileTab'>;
