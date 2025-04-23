import Navitem from "./Navitem";

const NavData = [
    {
        "name": "Home",
        "href": "/"
    },
    {
        "name": "About",
        "href": "/about"
    }
]


function Navigation() {
    return ( 
        <div className="flex gap-2 px-4">
        {NavData.map( (item, index) => (
            <Navitem key={index} href={item.href} name={item.name} />
        ))}
        </div>
     );
}

export default Navigation;