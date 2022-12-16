import className from 'classnames/bind';
import styles from './Form.module.scss';

const cx = className.bind(styles);
function Store() {
    return (
        // 
        <form >
            <h1>Store</h1>
            <label>Name</label>
            <input name="name" />
            <label>District</label>
            <select name="district">
                <option selected value="true">True</option>
                <option value="false">False</option>
            </select>
            <label>Address</label>
            <input name="address"/>
            <input type="submit" className={cx("submitButton")} />
        </form>
    )
}
export default Store;