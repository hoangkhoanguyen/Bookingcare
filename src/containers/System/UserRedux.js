
import { FormUserInfoRedux } from './FormUserInfoRedux';
import { UserListRedux } from './UserListRedux';
import './UserRedux.scss'

export const UserRedux = () => {

    return (
        <>
            <h1 className="title-section text-center">
                USER REDUX
            </h1>
            <FormUserInfoRedux />
            <UserListRedux />
        </>
    )
}
