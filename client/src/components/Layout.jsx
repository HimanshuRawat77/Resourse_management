import {NavLink,Outlet,useLocation,useNavigate} from 'react-router-dom';
import {Building2,CalendarDays,LayoutDashboard,Bell,LogOut,Menu,ShieldCheck} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
import {useCallback,useEffect,useState} from 'react';
import {api} from '../api';

const pageLabels={'/':'Overview','/resources':'Resources','/bookings':'My Bookings','/notifications':'Notifications','/admin':'Booking Requests'};
export default function Layout(){
  const {user,logout}=useAuth(),nav=useNavigate(),location=useLocation();
  const [open,setOpen]=useState(false),[unread,setUnread]=useState(0);
  const links=user?.role==='ADMIN'?[['/admin','Booking Requests',ShieldCheck],['/notifications','Notifications',Bell]]:[['/','Overview',LayoutDashboard],['/resources','Resources',Building2],['/bookings','My Bookings',CalendarDays],['/notifications','Notifications',Bell]];
  const refreshUnread=useCallback(async()=>{try{const {data}=await api.get('/notifications');setUnread(data.data.filter(n=>!n.is_read).length);}catch{setUnread(0);}},[]);
  useEffect(()=>{refreshUnread();const timer=setInterval(refreshUnread,30000);window.addEventListener('focus',refreshUnread);window.addEventListener('urms:notifications-updated',refreshUnread);return()=>{clearInterval(timer);window.removeEventListener('focus',refreshUnread);window.removeEventListener('urms:notifications-updated',refreshUnread);};},[refreshUnread]);
  const title=location.pathname.includes('/schedule')?'Resource Schedule':pageLabels[location.pathname]||'CampusSpace';
  return <div className="shell"><aside className={`sidebar ${open?'show':''}`}>
    <NavLink className="brand" to={user?.role==='ADMIN'?'/admin':'/'}><span className="brand-mark"><Building2 size={17}/></span><span className="brand-copy"><b>RISHIHOOD</b><small>UNIVERSITY · URMS</small></span></NavLink>
    <div className="nav-label">CAMPUS</div><nav>{links.map(([to,label,Icon])=><NavLink onClick={()=>setOpen(false)} end={to==='/'} className={({isActive})=>`nav-link ${isActive?'active':''}`} key={to} to={to}><Icon size={17}/><span>{label}</span>{to==='/notifications'&&unread>0&&<span className="notification-count">{unread>99?'99+':unread}</span>}</NavLink>)}</nav>
    {user?.role==='ADMIN'&&<div className="sidebar-note"><span className="nav-label">ADMINISTRATION</span><div className="sidebar-note-row"><ShieldCheck size={15}/><span>Booking authority</span></div></div>}
    <div className="sidebar-bottom"><div className="profile"><div className="avatar">{user?.name?.charAt(0)||'U'}</div><div className="profile-copy"><b>{user?.name}</b><span>{user?.role==='ADMIN'?'Administrator':'University member'}</span></div><button className="icon-btn" title="Sign out" onClick={()=>{logout();nav('/login');}}><LogOut size={16}/></button></div></div>
  </aside><main className="main"><header className="topbar"><button className="menu-btn" aria-label="Open navigation" onClick={()=>setOpen(!open)}><Menu size={19}/></button><div className="top-title"><span className="top-kicker">UNIVERSITY RESOURCE MANAGEMENT</span><b>{title}</b></div><div className="top-right"><NavLink className="header-bell" to="/notifications" aria-label={`${unread} unread notifications`}><Bell size={18}/>{unread>0&&<span className="notification-count">{unread>99?'99+':unread}</span>}</NavLink><span className="header-divider"/><div className="header-user"><div className="avatar">{user?.name?.charAt(0)||'U'}</div><div><b>{user?.name}</b><small>{user?.role==='ADMIN'?'Administrator':'Student'}</small></div></div></div></header><section className="content"><Outlet/></section></main></div>
}
