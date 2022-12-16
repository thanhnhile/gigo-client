import className from 'classnames/bind';
import styles from './Form.module.scss';

const cx = className.bind(styles);
function Category() {
    return (
        <form >
            <h1>Category</h1>
            <label>Name</label>
            <input name="name" />
            <label>Status</label>
            <select name="status">
                <option selected value="true">True</option>
                <option value="false">False</option>
            </select>
            <input type="submit" className={cx("submitButton")} />
        </form>
    )
}
export default Category;