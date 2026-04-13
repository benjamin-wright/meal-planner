import "./tab-header.css";

type Props = {
  id: string;
  tabs: string[];
  selected: string;
  onTabChange: (tab: string) => void;
}

export function TabHeader({ id, tabs, selected, onTabChange }: Props) {
  const tabWidth = 100 / tabs.length;
  const position = tabs.indexOf(selected) * tabWidth;

  return <>
    <div className="tab-header" role="tablist" aria-label="Tab List" id={id}>
      {tabs.map((tab, index) => (
        <button id={`${id}-tab-${index}`} role="tab" aria-label={tab} aria-selected={selected === tab} className={`glazing ${selected === tab ? 'selected' : ''}`} key={tab} onClick={() => onTabChange(tab)}>
          {tab}
        </button>
      ))}
      <div className="tab-header__indicator" style={{
        width: `${tabWidth}%`,
        left: `${position}%`
      }} />
    </div>
  </>
}
