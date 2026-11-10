import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,CalendarDays,Clock3,Building2,ChevronRight,CheckCircle2} from 'lucide-react';
import {api} from '../api';
import {useAuth} from '../context/AuthContext';
import ResourceCard from '../components/ResourceCard';
import StatusBadge from '../components/StatusBadge';
import Notice from '../components/Notice';

export default function Dashboard(){
  const {user}=useAuth();
  const [resources,setResources]=useState([]),[bookings,setBookings]=useState([]),[notifications,setNotifications]=useState([]),[error,setError]=useState('');
  useEffect(()=>{Promise.all([api.get('/resources'),api.get('/bookings/my'),api.get('/notifications')]).then(([r,b,n])=>{setResources(r.data.data);setBookings(b.data.data);setNotifications(n.data.data.slice(0,2));}).catch(e=>setError(e.response?.data?.message||'Unable to load dashboard.'));},[]);
  const upcoming=bookings.filter(b=>new Date(b.start_time)>new Date()&&b.status!=='CANCELLED').slice(0,3);
  const greeting=new Date().getHours()<12?'Good morning':new Date().getHours()<17?'Good afternoon':'Good evening';
  return <>
    <div className="page-heading"><div><div className="eyebrow">{new Date().toLocaleDateString([], {weekday:'long',month:'long',day:'numeric',year:'numeric'}).toUpperCase()}</div><h1>{greeting}, {user?.name?.split(' ')[0]}.</h1><p>Manage your university bookings and find a space for what’s next.</p></div><Link className="primary-btn" to="/resources">Explore spaces <ArrowUpRight size={16}/></Link></div>
    <Notice message={error}/>
    <div className="stats-grid"><Metric label="My bookings" value={bookings.length} icon={CalendarDays}/><Metric label="Pending" value={bookings.filter(b=>b.status==='PENDING').length} icon={Clock3}/><Metric label="Approved" value={bookings.filter(b=>b.status==='APPROVED').length} icon={CheckCircle2}/><Metric label="Available resources" value={resources.filter(r=>r.status==='AVAILABLE').length} icon={Building2}/></div>
    <div className="section-head"><div><div className="eyebrow">CAMPUS SPACES</div><h2>Find a place to gather</h2></div><Link to="/resources" className="text-link">All resources <ChevronRight size={15}/></Link></div>
    <div className="resource-grid">{resources.slice(0,3).map(r=><ResourceCard key={r.id} resource={r}/>)}</div>
    <div className="lower-grid"><section className="panel"><div className="panel-head"><div><div className="eyebrow">YOUR SCHEDULE</div><h2>Upcoming bookings</h2></div><Link to="/bookings" className="text-link">View all <ChevronRight size={14}/></Link></div>{upcoming.length?upcoming.map(b=><div className="booking-row" key={b.id}><div className="date-tile"><span>{new Date(b.start_time).toLocaleString('en',{month:'short'})}</span><b>{new Date(b.start_time).getDate()}</b></div><div className="booking-copy"><b>{b.purpose}</b><span>{b.resource_name} · {new Date(b.start_time).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})}</span></div><StatusBadge status={b.status}/></div>):<div className="empty-inline">No upcoming bookings yet.</div>}</section>
      <section className="panel"><div className="panel-head"><div><div className="eyebrow">RECENT ACTIVITY</div><h2>Notifications</h2></div><Link to="/notifications" className="text-link">See all <ChevronRight size={14}/></Link></div>{notifications.length?notifications.map(n=><div className="notification-row" key={n.id}><span className="notification-dot"/><div><p>{n.message}</p><small>{new Date(n.created_at).toLocaleDateString()}</small></div></div>):<div className="empty-inline">You’re all caught up.</div>}</section></div>
  </>;
}
function Metric({label,value,icon:Icon}){return <div className="stat-card"><div className="stat-top"><span>{label}</span><Icon size={16}/></div><strong>{String(value).padStart(2,'0')}</strong></div>}
