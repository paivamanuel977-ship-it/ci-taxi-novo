import React, { useState } from 'react';
import {
  LayoutDashboard, CarFront, Users, UserRound, Wallet, Fuel, FileBarChart,
  Settings, Menu, Bell, Search, Plus, ArrowUpRight, ArrowDownRight,
  CalendarDays, MapPin, Clock3, ShieldCheck, ChevronRight, CircleHelp
} from 'lucide-react';

const menu = [
  ['Painel principal', LayoutDashboard], ['Corridas', CarFront],
  ['Motoristas', Users], ['Passageiros', UserRound], ['Viaturas', CarFront],
  ['Despesas', Fuel], ['Salários', Wallet], ['Relatórios', FileBarChart],
  ['Configurações', Settings]
];

const trips = [
  ['CT-00241', 'Manuel António', 'Aeroporto', 'Concluída', '12.500 Kz'],
  ['CT-00240', 'José Paulo', 'Talatona', 'Em andamento', '8.000 Kz'],
  ['CT-00239', 'Carlos Miguel', 'Kilamba', 'Concluída', '6.500 Kz'],
  ['CT-00238', 'Pedro João', 'Viana', 'Cancelada', '—']
];

export default function App() {
  const [active, setActive] = useState('Painel principal');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [period, setPeriod] = useState('Hoje');

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">CI</div>
        <div><strong>CI TÁXI</strong><small>PAINEL DE GESTÃO</small></div>
      </div>
      <div className="nav-label">MENU PRINCIPAL</div>
      <nav>{menu.map(([label, Icon]) => <button key={label}
        className={`nav-item ${active === label ? 'selected' : ''}`}
        onClick={() => {setActive(label); setMobileOpen(false);}}>
        <Icon size={18}/><span>{label}</span>{active === label && <ChevronRight size={16} className="nav-arrow"/>}
      </button>)}</nav>
      <div className="sidebar-bottom">
        <div className="secure"><ShieldCheck size={18}/><div><b>Acesso protegido</b><small>Área administrativa</small></div></div>
        <div className="version">CI TÁXI · Nova plataforma</div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu/></button>
        <div className="breadcrumb">CI TÁXI <span>/</span> {active}</div>
        <div className="top-actions">
          <button className="icon-btn" aria-label="Pesquisar"><Search size={19}/></button>
          <button className="icon-btn notification" aria-label="Notificações"><Bell size={19}/><i/></button>
          <div className="profile"><div className="avatar">P</div><div className="profile-text"><b>Proprietário</b><small>Administrador</small></div></div>
        </div>
      </header>

      <section className="content">
        <div className="welcome-row">
          <div><div className="eyebrow">GESTÃO DA FROTA E OPERAÇÕES</div><h1>{active}</h1>
          <p>Acompanhe a operação da CI TÁXI num só lugar.</p></div>
          <div className="welcome-actions"><button className="date-select"><CalendarDays size={16}/>{period}<select value={period} onChange={e=>setPeriod(e.target.value)} aria-label="Período"><option>Hoje</option><option>Esta semana</option><option>Este mês</option></select></button>
          <button className="primary-btn" onClick={()=>setActive('Corridas')}><Plus size={17}/> Nova corrida</button></div>
        </div>

        <div className="notice"><ShieldCheck size={18}/><span><b>Área administrativa:</b> os dados apresentados são demonstrativos. A autenticação e as permissões serão ligadas ao servidor antes de utilizar dados reais.</span></div>

        <div className="section-heading"><div><h2>Resumo da operação</h2><p>Indicadores demonstrativos do período selecionado</p></div><button className="text-link" onClick={()=>setActive('Relatórios')}>Ver relatórios <ArrowUpRight size={15}/></button></div>

        <div className="stats-grid">
          <Stat title="Corridas registadas" value="48" note="+8,2% face ao período anterior" icon={CarFront} tone="blue" up/>
          <Stat title="Motoristas ativos" value="12" note="De 15 motoristas registados" icon={Users} tone="green"/>
          <Stat title="Viaturas disponíveis" value="9" note="3 em serviço ou manutenção" icon={CarFront} tone="purple"/>
          <Stat title="Despesas registadas" value="185.000 Kz" note="Combustível e operações" icon={Fuel} tone="orange"/>
        </div>

        <div className="lower-grid">
          <section className="panel trips-panel">
            <div className="panel-head"><div><h2>Corridas recentes</h2><p>Últimos movimentos registados</p></div><button className="outline-btn" onClick={()=>setActive('Corridas')}>Ver todas</button></div>
            <div className="table-wrap"><table><thead><tr><th>REFERÊNCIA</th><th>MOTORISTA</th><th>DESTINO</th><th>ESTADO</th><th>VALOR</th></tr></thead>
            <tbody>{trips.map(t=><tr key={t[0]}><td className="ref">{t[0]}</td><td>{t[1]}</td><td>{t[2]}</td><td><span className={`status ${t[3]==='Concluída'?'done':t[3]==='Em andamento'?'progress':'cancel'}`}>{t[3]}</span></td><td className="amount">{t[4]}</td></tr>)}</tbody></table></div>
          </section>
          <section className="panel quick-panel">
            <div className="panel-head"><div><h2>Acesso rápido</h2><p>Operações frequentes</p></div></div>
            <Quick icon={CarFront} title="Registar corrida" desc="Adicionar uma nova viagem" onClick={()=>setActive('Corridas')}/>
            <Quick icon={Users} title="Adicionar motorista" desc="Registar um membro da frota" onClick={()=>setActive('Motoristas')}/>
            <Quick icon={Fuel} title="Registar despesa" desc="Combustível ou manutenção" onClick={()=>setActive('Despesas')}/>
            <Quick icon={Wallet} title="Gestão salarial" desc="Consultar pagamentos mensais" onClick={()=>setActive('Salários')}/>
          </section>
        </div>

        <footer><span>© 2026 CI TÁXI · Plataforma de gestão</span><span><CircleHelp size={14}/> Protótipo inicial</span></footer>
      </section>
    </main>
  </div>;
}

function Stat({title,value,note,icon:Icon,tone,up}) {
  return <div className="stat-card"><div className="stat-top"><span>{title}</span><div className={`stat-icon ${tone}`}><Icon size={19}/></div></div><div className="stat-value">{value}</div><div className="stat-note">{up && <ArrowUpRight size={14}/>} {note}</div></div>;
}
function Quick({icon:Icon,title,desc,onClick}) {
  return <button className="quick-item" onClick={onClick}><div className="quick-icon"><Icon size={18}/></div><div><b>{title}</b><small>{desc}</small></div><ChevronRight size={17} className="quick-chevron"/></button>;
}