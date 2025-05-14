import Navitem from "./Navitem";
import AddButton from "./tasks/addButton";

const NavData = [
    {
        "src": "./Tasks-icon.svg",
        "href": "/dashboard"
    },
    {
        "src": "./Priority-icon.svg",
        "href": "/dashboard"
    },
    {
        "src": "./Calender-icon.svg",
        "href": "/dashboard"
    },
]


function Navigation() {
    return ( 
        <div className="flex flex-col gap-4 px-4 py-5 bg-black/30 border rounded-2xl">
        {NavData.map( (item, index) => (
            <Navitem key={index} href={item.href} name={item.src} />
        ))}
        <AddButton />
        </div>
     );
}

export default Navigation;
