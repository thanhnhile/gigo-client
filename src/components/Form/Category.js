import className from 'classnames/bind';
import styles from './Form.module.scss';

const cx = className.bind(styles);
function Category() {
    return (
        <form >
            <h1>Phân loại</h1>
            <label>Tên</label>
            <input name="name" />
            <label>Trạng thái</label>
            <select name="status">
                <option selected value="true">True</option>
                <option value="false">False</option>
            </select>
            <input type="submit" className={cx("submitButton")} />
        </form>
    )
}
export default Category;