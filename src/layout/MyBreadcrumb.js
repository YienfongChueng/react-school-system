import { Breadcrumb } from 'antd';
import { Link} from 'react-router-dom'
import { routes } from '../router/config'
 
export default function MyBreadcrumb(props) {

    const items = routes.find(d => d.path === '/home')?.children
    function itemRender(currentRoute, params, items, paths) {

        const isLast = currentRoute?.path === items[items.length - 1]?.path;
      
        return isLast ? (
          <span>{currentRoute?.meta?.title}</span>
        ) : (
          <Link to={`/${paths.join("/")}`}>{currentRoute?.meta?.title}</Link>
        );
    }

    return (
        <Breadcrumb
            itemRender={itemRender}
            items={items}
        />
    )
}
