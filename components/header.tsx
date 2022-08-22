import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';

const Header = () => {

    const router = useRouter();

    const logoutUser = async () => {
        const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if(req.ok) {
            router.push('/');
        }
        else {
            console.log('Failed to logout user');
        }
    }

    return (
        <div className={styles.wrapper}>
            <div>IMBD</div>
            <div className={styles.fill}></div>
            <button className={styles.logout} onClick={() => logoutUser()}>Logout</button>
        </div>
    )
}

export default Header;