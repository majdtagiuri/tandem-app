const PERMISSION_DEFS = [
  { key: 'invite', label: 'Can invite new members', toast: 'invite new members' },
  { key: 'manageBilling', label: 'Can manage plan & billing', toast: 'manage billing' },
  { key: 'viewInvoices', label: 'Can view invoices', toast: 'view invoices' },
  { key: 'createInvoices', label: 'Can create invoices', toast: 'create invoices' },
  { key: 'exportReports', label: 'Can export reports', toast: 'export reports' },
  { key: 'manageSettings', label: 'Can manage workspace settings', toast: 'manage settings' }
];

const ROLE_PRESETS = {
  admin: {
    invite: true,
    manageBilling: true,
    viewInvoices: true,
    createInvoices: true,
    exportReports: true,
    manageSettings: true
  },
  member: {
    invite: false,
    manageBilling: false,
    viewInvoices: true,
    createInvoices: true,
    exportReports: false,
    manageSettings: false
  },
  viewer: {
    invite: false,
    manageBilling: false,
    viewInvoices: true,
    createInvoices: false,
    exportReports: false,
    manageSettings: false
  }
};

const OWNER_PERMISSIONS = {
  invite: true,
  manageBilling: true,
  viewInvoices: true,
  createInvoices: true,
  exportReports: true,
  manageSettings: true
};

const PLANS = {
  solo: {
    id: 'solo',
    name: 'Solo',
    price: 9,
    seats: 1,
    features: ['1 seat', 'Core invoicing', 'Email support']
  },
  studio: {
    id: 'studio',
    name: 'Studio',
    price: 29,
    seats: 5,
    features: ['5 seats', 'Role-based access', 'Invoice & tax exports']
  },
  agency: {
    id: 'agency',
    name: 'Agency',
    price: 79,
    seats: 20,
    features: ['20 seats', 'Advanced permissions', 'Priority support']
  }
};

const ROLE_OPTIONS = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'member', label: 'Member' },
  { value: 'admin', label: 'Admin' }
];

const INVITE_ROLE_OPTIONS = [
  { value: 'viewer', label: 'Viewer: can view invoices only' },
  { value: 'member', label: 'Member: can view and edit work' },
  { value: 'admin', label: 'Admin: can manage members and settings' }
];

function roleLabel(role) {
  if (role === 'owner') return 'Owner';
  if (role === 'admin') return 'Admin';
  if (role === 'viewer') return 'Viewer';
  return 'Member';
}

function roleTagClass(role) {
  if (role === 'owner') return 'tag tag--owner';
  if (role === 'admin') return 'tag tag--admin';
  if (role === 'viewer') return 'tag tag--viewer';
  return 'tag tag--member';
}

function roleTag(role) {
  return `<span class="${roleTagClass(role)}">${roleLabel(role)}</span>`;
}

/* App meaning → Phosphor Bold filename key (see /icons + icons.js) */
const APP_ICONS = {
  dashboard: 'squares-four-bold',
  invoices: 'receipt-bold',
  tax: 'percent-bold',
  settings: 'gear-six-bold',
  workspace: 'buildings-bold',
  general: 'faders-bold',
  members: 'users-bold',
  billing: 'cardholder-bold',
  solo: 'user-bold',
  studio: 'users-three-bold',
  agency: 'building-office-bold',
  invite: 'user-plus-bold',
  edit: 'pencil-simple-bold',
  deactivate: 'pause-circle-bold',
  activate: 'play-circle-bold',
  remove: 'trash-bold',
  reorder: 'list-dashes-bold',
  manage: 'sliders-horizontal-bold',
  resend: 'arrow-clockwise-bold',
  check: 'check-bold',
  transfer: 'user-switch-bold',
  card: 'credit-card-bold',
  swap: 'arrows-left-right-bold',
  ban: 'prohibit-bold',
  cancel: 'x-bold',
  caret: 'caret-down-bold',
  menu: 'dots-three-vertical-bold',
  export: 'export-bold',
  warning: 'warning-circle-bold',
  restore: 'arrow-counter-clockwise-bold'
};

function iconSvg(name, extraClass = '') {
  const key = APP_ICONS[name] || name;
  const classes = [`icon--${name}`, extraClass].filter(Boolean).join(' ');
  return renderIcon(key, classes);
}

function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.getAttribute('data-icon');
    const wrap = document.createElement('span');
    wrap.className = 'icon-wrap';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = iconSvg(name);
    el.replaceWith(wrap);
  });
}
function clonePermissions(source) {
  return { ...source };
}

function permissionsForRole(role) {
  if (role === 'owner') return clonePermissions(OWNER_PERMISSIONS);
  return clonePermissions(ROLE_PRESETS[role] || ROLE_PRESETS.member);
}

const state = {
  members: [
    {
      id: 1,
      name: 'Majd (you)',
      email: 'majd@studio.co',
      role: 'owner',
      status: 'active',
      permissions: permissionsForRole('owner')
    },
    {
      id: 2,
      name: 'Reem K.',
      email: 'reem@studio.co',
      role: 'admin',
      status: 'active',
      permissions: permissionsForRole('admin')
    },
    {
      id: 3,
      name: 'Jordan T.',
      email: 'jordan@studio.co',
      role: 'member',
      status: 'active',
      permissions: permissionsForRole('member')
    },
    {
      id: 4,
      name: 'sam@freelance.co',
      email: 'sam@freelance.co',
      role: 'member',
      status: 'pending',
      permissions: permissionsForRole('member')
    }
  ],
  billing: {
    planId: 'studio',
    cycle: 'monthly',
    status: 'active', // active | canceling
    nextBillingDate: 'October 12, 2026',
    paymentMethod: { brand: 'Visa', last4: '4242' },
    invoices: [
      {
        id: 'inv-2026-09',
        number: 'INV-2026-09',
        date: 'Sep 12, 2026',
        period: 'Sep 12 – Oct 11, 2026',
        planName: 'Studio',
        amount: 29,
        tax: 0,
        status: 'Paid',
        payment: 'Visa ···· 4242'
      },
      {
        id: 'inv-2026-08',
        number: 'INV-2026-08',
        date: 'Aug 12, 2026',
        period: 'Aug 12 – Sep 11, 2026',
        planName: 'Studio',
        amount: 29,
        tax: 0,
        status: 'Paid',
        payment: 'Visa ···· 4242'
      },
      {
        id: 'inv-2026-07',
        number: 'INV-2026-07',
        date: 'Jul 12, 2026',
        period: 'Jul 12 – Aug 11, 2026',
        planName: 'Studio',
        amount: 29,
        tax: 0,
        status: 'Paid',
        payment: 'Visa ···· 4242'
      },
      {
        id: 'inv-2026-06',
        number: 'INV-2026-06',
        date: 'Jun 12, 2026',
        period: 'Jun 12 – Jul 11, 2026',
        planName: 'Studio',
        amount: 29,
        tax: 0,
        status: 'Paid',
        payment: 'Visa ···· 4242'
      },
      {
        id: 'inv-2026-05',
        number: 'INV-2026-05',
        date: 'May 12, 2026',
        period: 'May 12 – Jun 11, 2026',
        planName: 'Studio',
        amount: 29,
        tax: 0,
        status: 'Paid',
        payment: 'Visa ···· 4242'
      },
      {
        id: 'inv-2026-04',
        number: 'INV-2026-04',
        date: 'Apr 12, 2026',
        period: 'Apr 12 – May 11, 2026',
        planName: 'Studio',
        amount: 29,
        tax: 0,
        status: 'Paid',
        payment: 'Visa ···· 4242'
      }
    ]
  }
};

let nextId = 5;
let pendingRemoveId = null;
let pendingDeactivateId = null;
let pendingCancelInviteId = null;
let pendingPermissionsId = null;
let pendingPlanId = null;
let pendingTransferId = null;
let pendingInvoiceId = null;
let invoiceFromHistory = false;
let paymentFromInvoice = false;
let paymentIntent = 'save'; // save | pay
let inviteRoleDropdown = null;
let transferMemberDropdown = null;
let openDropdown = null;
let openRowMenu = null;
let reorderMode = false;
let viewAs = 'owner'; // owner | admin | other

function canManageMembers() {
  return viewAs === 'owner' || viewAs === 'admin';
}

function canManageSettings() {
  return viewAs === 'owner' || viewAs === 'admin';
}

function canManageBilling() {
  return viewAs === 'owner' || viewAs === 'admin';
}

function canTransferOwnership() {
  return viewAs === 'owner';
}

function viewAsLabel() {
  if (viewAs === 'owner') return 'Owner';
  if (viewAs === 'admin') return 'Admin';
  return 'Member / Viewer';
}

function applyViewAs() {
  const note = document.getElementById('view-as-note');
  document.querySelectorAll('[data-view-as]').forEach(btn => {
    btn.classList.toggle('view-as__btn--active', btn.dataset.viewAs === viewAs);
  });

  if (viewAs === 'owner') {
    note.hidden = true;
    note.textContent = '';
  } else {
    note.hidden = false;
    note.textContent = `Previewing as ${viewAsLabel()}. Controls match what this role can change.`;
  }

  const manageSettings = canManageSettings();
  const nameInput = document.getElementById('workspace-name');
  const urlInput = document.getElementById('workspace-url');
  const saveBtn = document.getElementById('general-save');
  const generalSub = document.querySelector('#tab-general .panel-sub');
  const generalHint = document.querySelector('#tab-general .hint');
  nameInput.disabled = !manageSettings;
  urlInput.disabled = !manageSettings;
  nameInput.readOnly = !manageSettings;
  urlInput.readOnly = !manageSettings;
  saveBtn.hidden = !manageSettings;
  if (generalSub) {
    generalSub.textContent = manageSettings
      ? 'Workspace identity used across invoices and invites.'
      : 'You can view the workspace name, URL, and plan details.';
  }
  if (generalHint) generalHint.hidden = !manageSettings;

  const dangerZone = document.getElementById('danger-zone');
  if (dangerZone) dangerZone.hidden = viewAs !== 'owner';

  const billingTab = document.getElementById('tab-btn-billing');
  const billingPanel = document.getElementById('tab-billing');
  const planDetailsBlock = document.getElementById('plan-details-block');
  const isOther = viewAs === 'other';

  billingTab.hidden = isOther;
  planDetailsBlock.hidden = !isOther;

  if (isOther && !billingPanel.hidden) {
    switchTab('general');
  }

  if (reorderMode && !canManageMembers()) {
    reorderMode = false;
    document.body.classList.remove('is-reordering');
  }

  renderMembers();
  renderBilling();
}

document.querySelectorAll('[data-view-as]').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = btn.dataset.viewAs;
    if (!next || next === viewAs) return;
    const prev = viewAs;
    viewAs = next;
    closeAllOverlays();
    if (next === 'other') {
      activateJustJoinedMember();
      applyViewAs();
      openWelcomeJoinModal();
      return;
    }
    if (prev === 'other') {
      // keep joined teammate in the list for continuity
    }
    applyViewAs();
  });
});

const JUST_JOINED_ID = 5;

function activateJustJoinedMember() {
  let casey = state.members.find(m => m.id === JUST_JOINED_ID || m.email === 'casey@studio.co');
  if (!casey) {
    casey = {
      id: JUST_JOINED_ID,
      name: 'Casey L.',
      email: 'casey@studio.co',
      role: 'member',
      status: 'pending',
      order: state.members.length,
      permissions: permissionsForRole('member')
    };
    state.members.push(casey);
    if (nextId <= JUST_JOINED_ID) nextId = JUST_JOINED_ID + 1;
  }
  if (casey.status === 'pending') {
    casey.status = 'active';
    casey.name = 'Casey L.';
  }
}

function openWelcomeJoinModal() {
  const note = document.getElementById('welcome-join-note');
  if (note) {
    note.textContent = 'Casey L. just accepted their invite too and is now active on the team.';
  }
  switchTab('members');
  openOverlay('welcome-join-overlay');
}
let dragState = null;

// Stable custom order (owner stays first)
state.members.forEach((m, i) => { m.order = i; });

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function shortName(name) {
  return name.replace(/\s*\(you\)\s*/i, '').split(/\s+/)[0];
}

function seatsUsed() {
  return state.members.length;
}

function currentPlan() {
  return PLANS[state.billing.planId];
}

/* ---------- Custom dropdown ---------- */

function closeOpenDropdown() {
  if (!openDropdown) return;
  openDropdown._close(false);
  openDropdown = null;
}

function createDropdown({ options, value, className = '', ariaLabel = 'Select', onChange }) {
  const root = document.createElement('div');
  root.className = `dropdown ${className}`.trim();

  let current = value;
  let activeIndex = Math.max(0, options.findIndex(o => o.value === current));

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'dropdown__trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-label', ariaLabel);

  const valueEl = document.createElement('span');
  valueEl.className = 'dropdown__value';

  const chevron = document.createElement('span');
  chevron.className = 'dropdown__chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.innerHTML = iconSvg('caret');

  trigger.append(valueEl, chevron);

  const list = document.createElement('ul');
  list.className = 'dropdown__list';
  list.setAttribute('role', 'listbox');
  list.hidden = true;

  function labelFor(val) {
    return options.find(o => o.value === val)?.label ?? val;
  }

  function syncLabel() {
    valueEl.textContent = labelFor(current);
  }

  function renderOptions() {
    list.innerHTML = '';
    options.forEach((opt, index) => {
      const li = document.createElement('li');
      li.className = 'dropdown__option';
      li.setAttribute('role', 'option');
      li.dataset.value = opt.value;
      li.setAttribute('aria-selected', opt.value === current ? 'true' : 'false');
      if (index === activeIndex) li.classList.add('dropdown__option--active');
      li.textContent = opt.label;
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        selectValue(opt.value, true);
      });
      list.appendChild(li);
    });
  }

  function highlight() {
    list.querySelectorAll('.dropdown__option').forEach((el, index) => {
      el.classList.toggle('dropdown__option--active', index === activeIndex);
    });
    const active = list.children[activeIndex];
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function open() {
    if (!list.hidden) return;
    closeOpenDropdown();
    activeIndex = Math.max(0, options.findIndex(o => o.value === current));
    renderOptions();
    list.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    root.classList.add('dropdown--open');
    openDropdown = api;
  }

  function close(refocus) {
    if (list.hidden) return;
    list.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    root.classList.remove('dropdown--open');
    if (openDropdown === api) openDropdown = null;
    if (refocus) trigger.focus();
  }

  function selectValue(next, fireChange) {
    const prev = current;
    current = next;
    syncLabel();
    close(true);
    if (fireChange && prev !== next && typeof onChange === 'function') {
      onChange(next, prev);
    }
  }

  trigger.addEventListener('click', () => {
    if (list.hidden) open();
    else close(false);
  });

  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (list.hidden) {
        open();
        return;
      }
      if (e.key === 'ArrowDown') activeIndex = Math.min(options.length - 1, activeIndex + 1);
      else activeIndex = Math.max(0, activeIndex - 1);
      highlight();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (list.hidden) open();
      else selectValue(options[activeIndex].value, true);
    } else if (e.key === 'Escape') {
      if (!list.hidden) {
        e.preventDefault();
        e.stopPropagation();
        close(true);
      }
    } else if (e.key === 'Home' && !list.hidden) {
      e.preventDefault();
      activeIndex = 0;
      highlight();
    } else if (e.key === 'End' && !list.hidden) {
      e.preventDefault();
      activeIndex = options.length - 1;
      highlight();
    }
  });

  root.append(trigger, list);
  syncLabel();
  renderOptions();

  const api = {
    el: root,
    getValue: () => current,
    setValue: (next) => {
      current = next;
      syncLabel();
      renderOptions();
    },
    _close: close,
    _isOpen: () => !list.hidden
  };

  root._dropdown = api;
  return api;
}

document.addEventListener('mousedown', (e) => {
  if (openDropdown && !openDropdown.el.contains(e.target)) closeOpenDropdown();
  if (openRowMenu && !openRowMenu.contains(e.target)) closeRowMenu();
});

/* ---------- Members ---------- */

function closeRowMenu() {
  if (!openRowMenu) return;
  openRowMenu.classList.remove('row-menu--open');
  const btn = openRowMenu.querySelector('.row-menu__trigger');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  openRowMenu = null;
}

function membersInOrder() {
  return [...state.members].sort((a, b) => {
    if (a.role === 'owner') return -1;
    if (b.role === 'owner') return 1;
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

function syncMemberOrderFromDom() {
  const rows = [...document.querySelectorAll('#members-list .member-row[data-id]')];
  rows.forEach((row, index) => {
    const m = state.members.find(x => x.id === Number(row.dataset.id));
    if (m) m.order = index;
  });
}

function updateMembersCount() {
  const active = state.members.filter(m => m.status === 'active').length;
  const pending = state.members.filter(m => m.status === 'pending').length;
  const inactive = state.members.filter(m => m.status === 'inactive').length;
  const parts = [`${active} active`];
  if (pending) parts.push(`${pending} pending`);
  if (inactive) parts.push(`${inactive} inactive`);
  document.getElementById('members-count').textContent = parts.join(' · ');
}

function statusTag(status) {
  if (status === 'pending') return `<span class="status-label status-label--pending">Pending</span>`;
  if (status === 'inactive') return `<span class="status-label status-label--inactive">Inactive</span>`;
  return `<span class="status-label status-label--active">Active</span>`;
}

function buildRowMenu(m) {
  const wrap = document.createElement('div');
  wrap.className = 'row-menu';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'row-menu__trigger';
  trigger.setAttribute('aria-haspopup', 'menu');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-label', `Actions for ${m.name}`);
  trigger.innerHTML = iconSvg('menu');

  const panel = document.createElement('div');
  panel.className = 'row-menu__panel';
  panel.setAttribute('role', 'menu');

  const items = [];
  if (m.status === 'active') {
    items.push({ action: 'deactivate', label: 'Deactivate', icon: 'deactivate' });
  } else if (m.status === 'inactive') {
    items.push({ action: 'activate', label: 'Activate', icon: 'activate' });
  }
  items.push({ action: 'remove', label: 'Remove', danger: true, icon: 'remove' });

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'row-menu__item' + (item.danger ? ' row-menu__item--danger' : '');
    btn.setAttribute('role', 'menuitem');
    btn.dataset.action = item.action;
    btn.dataset.id = String(m.id);
    btn.innerHTML = `${iconSvg(item.icon)}<span>${item.label}</span>`;
    panel.appendChild(btn);
  });

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = openRowMenu !== wrap;
    closeRowMenu();
    closeOpenDropdown();
    if (!willOpen) return;
    wrap.classList.add('row-menu--open');
    trigger.setAttribute('aria-expanded', 'true');
    openRowMenu = wrap;
  });

  wrap.append(trigger, panel);
  return wrap;
}

function buildRow(m) {
  const row = document.createElement('div');
  row.className = 'member-row';
  if (reorderMode) row.classList.add('member-row--reorder');
  if (m.status === 'inactive') row.classList.add('member-row--inactive');
  row.dataset.id = String(m.id);

  const isPending = m.status === 'pending';
  const isOwner = m.role === 'owner';
  const manage = canManageMembers();
  const canEdit = manage && !isPending && !isOwner;
  const avatarClass = isPending ? 'avatar avatar--pending' : 'avatar';
  const avatarContent = isPending ? '' : escapeHtml(initials(m.name));
  const safeName = escapeHtml(m.name);
  const safeEmail = escapeHtml(m.email);

  const info = document.createElement('div');
  info.className = 'member-info';

  if (!isOwner && manage) {
    const handle = document.createElement('div');
    handle.className = 'drag-handle';
    handle.innerHTML = `<button type="button" class="drag-handle__btn" aria-label="Drag to reorder ${safeName}" data-drag-id="${m.id}" tabindex="${reorderMode ? '0' : '-1'}"><span class="drag-handle__lines" aria-hidden="true"></span></button>`;
    info.appendChild(handle);
  }

  const identity = document.createElement('div');
  identity.className = 'member-identity';
  identity.innerHTML = `
    <div class="${avatarClass}" aria-hidden="true">${avatarContent}</div>
    <p class="member-name">${safeName}</p>
    <p class="member-email">${isPending ? 'Invited · ' + safeEmail : safeEmail}</p>
  `;
  info.appendChild(identity);

  const roleCell = document.createElement('div');
  roleCell.className = 'member-role';
  if (isOwner) {
    roleCell.innerHTML = roleTag('owner');
  } else if (isPending || !manage || reorderMode) {
    roleCell.innerHTML = roleTag(m.role);
  } else {
    const dropdown = createDropdown({
      options: ROLE_OPTIONS,
      value: m.role,
      className: `dropdown--role dropdown--role-${m.role}`,
      ariaLabel: `Role for ${m.name}`,
      onChange: (role) => changeRole(m.id, role)
    });
    roleCell.appendChild(dropdown.el);
  }

  const statusCell = document.createElement('div');
  statusCell.className = 'member-status';
  statusCell.innerHTML = statusTag(m.status);

  const permCell = document.createElement('div');
  permCell.className = 'member-perms';
  if (canEdit && !reorderMode) {
    permCell.innerHTML = `<button type="button" class="btn btn--perm" data-action="permissions" data-id="${m.id}" aria-label="Edit permissions for ${safeName}">${iconSvg('edit')}<span>Edit</span></button>`;
  } else if (isOwner && canTransferOwnership() && !reorderMode) {
    permCell.innerHTML = `<button type="button" class="btn btn--perm" data-action="transfer-ownership" aria-label="Transfer ownership">${iconSvg('transfer')}<span>Ownership</span></button>`;
  } else if (isPending && manage && !reorderMode) {
    permCell.innerHTML = `<button type="button" class="btn btn--perm" data-action="resend" data-id="${m.id}" aria-label="Resend invite to ${safeEmail}">${iconSvg('resend')}<span>Resend</span></button>`;
  } else {
    permCell.innerHTML = `<span class="perm-placeholder" aria-hidden="true">—</span>`;
  }

  const actions = document.createElement('div');
  actions.className = 'row-actions';
  if (isPending && manage) {
    actions.innerHTML = `<button type="button" class="btn--icon btn--icon-danger" data-action="cancel-invite" data-id="${m.id}" aria-label="Cancel invite to ${safeEmail}">${iconSvg('cancel')}</button>`;
  } else if (isOwner || reorderMode || !manage) {
    actions.innerHTML = `<span class="row-actions-spacer" aria-hidden="true"></span>`;
  } else {
    actions.appendChild(buildRowMenu(m));
  }

  const trailing = document.createElement('div');
  trailing.className = 'member-trailing';
  trailing.append(permCell, actions);

  row.append(info, roleCell, statusCell, trailing);
  return row;
}

function setReorderHeaderState(on) {
  const manage = canManageMembers();
  const defaults = document.getElementById('header-actions-default');
  const reorderSet = document.getElementById('header-actions-reorder');
  const showDefault = !on && manage;
  const showDone = on;

  defaults.classList.toggle('header-actions-set--out', !showDefault);
  reorderSet.classList.toggle('header-actions-set--out', !showDone);

  defaults.toggleAttribute('inert', !showDefault);
  reorderSet.toggleAttribute('inert', !showDone);

  defaults.setAttribute('aria-hidden', String(!showDefault));
  reorderSet.setAttribute('aria-hidden', String(!showDone));

  // Hide the whole default set when preview-as Other (no manage)
  defaults.hidden = !manage && !on;
}

function renderMembers(options = {}) {
  const { animateReorderIn = false } = options;
  const list = document.getElementById('members-list');
  closeOpenDropdown();
  closeRowMenu();
  list.innerHTML = '';
  // Keep collapsed on animate-in so the handle can expand smoothly after paint
  list.classList.toggle('members-list--reorder', reorderMode && !animateReorderIn);
  updateMembersCount();
  setReorderHeaderState(reorderMode);

  const header = document.createElement('div');
  header.className = 'members-header';
  header.innerHTML = `
    <span>Person</span>
    <span class="members-header__role">Role</span>
    <span class="members-header__status">Status</span>
    <div class="members-header__trailing">
      <span class="members-header__perms">Permissions</span>
      <span class="members-header__actions" aria-hidden="true"></span>
    </div>
  `;
  list.appendChild(header);

  const others = state.members.filter(m => m.role !== 'owner');
  if (others.length === 0) {
    const owner = state.members.find(m => m.role === 'owner');
    if (owner) list.appendChild(buildRow(owner));

    const emptyRow = document.createElement('div');
    emptyRow.className = 'member-row empty-row';
    emptyRow.innerHTML = `
      <div class="member-info">
        <div class="member-identity">
          <p class="member-name">No teammates yet</p>
          <p class="member-email">Invite people to help manage this workspace.</p>
        </div>
      </div>
      <button class="btn btn--primary" type="button" data-action="invite">${iconSvg('invite')}<span>Invite teammate</span></button>
    `;
    list.appendChild(emptyRow);
    renderBilling();
    if (animateReorderIn) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          list.classList.add('members-list--reorder');
        });
      });
    }
    return;
  }

  membersInOrder().forEach(m => list.appendChild(buildRow(m)));
  renderBilling();

  if (animateReorderIn) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        list.classList.add('members-list--reorder');
      });
    });
  }
}

function changeRole(id, role) {
  if (!canManageMembers()) return;
  const m = state.members.find(x => x.id === id);
  if (!m || m.role === 'owner' || m.status === 'pending') return;
  m.role = role;
  m.permissions = permissionsForRole(role);

  const row = document.querySelector(`.member-row[data-id="${id}"]`);
  const dropdown = row?.querySelector('.dropdown--role');
  if (dropdown) {
    dropdown.classList.remove('dropdown--role-admin', 'dropdown--role-member', 'dropdown--role-viewer');
    dropdown.classList.add(`dropdown--role-${role}`);
  }

  showToast(`${m.name}'s role is now ${roleLabel(role)}`);
}

function enterReorderMode() {
  if (!canManageMembers() || reorderMode) return;
  closeRowMenu();
  closeOpenDropdown();
  reorderMode = true;
  setReorderHeaderState(true);

  const list = document.getElementById('members-list');
  const hasHandles = Boolean(list.querySelector('.drag-handle'));
  if (hasHandles) {
    list.classList.add('members-list--reorder');
    // Swap interactive controls after the handle finishes sliding open
    window.setTimeout(() => renderMembers(), 170);
  } else {
    renderMembers({ animateReorderIn: true });
  }
  showToast('Drag rows to reorder · press Done when finished');
}

function exitReorderMode() {
  if (!reorderMode) return;
  syncMemberOrderFromDom();
  const list = document.getElementById('members-list');
  list.classList.remove('members-list--reorder');
  setReorderHeaderState(false);

  window.setTimeout(() => {
    reorderMode = false;
    renderMembers();
    showToast('Member order saved');
  }, 170);
}

function deactivateMember(id) {
  const m = state.members.find(x => x.id === id);
  if (!m || m.role === 'owner') return;
  m.status = 'inactive';
  pendingDeactivateId = null;
  renderMembers();
  showToast(`${m.name} deactivated`);
}

function confirmDeactivate(id) {
  pendingDeactivateId = id;
  const m = state.members.find(x => x.id === id);
  if (!m) return;
  document.getElementById('deactivate-name').textContent = m.name;
  openOverlay('deactivate-overlay');
}

function activateMember(id) {
  const m = state.members.find(x => x.id === id);
  if (!m || m.role === 'owner') return;
  m.status = 'active';
  renderMembers();
  showToast(`${m.name} activated`);
}

function eligibleTransferTargets() {
  return membersInOrder().filter(m =>
    m.role !== 'owner' && m.status === 'active'
  );
}

function openTransferOwnership() {
  if (!canTransferOwnership()) return;
  const targets = eligibleTransferTargets();
  const mount = document.getElementById('transfer-member');
  const errorEl = document.getElementById('transfer-error');
  errorEl.hidden = true;
  mount.innerHTML = '';
  pendingTransferId = null;

  if (targets.length === 0) {
    errorEl.textContent = 'You need at least one active teammate to transfer ownership.';
    errorEl.hidden = false;
    transferMemberDropdown = null;
    openOverlay('transfer-overlay');
    return;
  }

  const options = targets.map(m => ({
    value: String(m.id),
    label: `${m.name} · ${roleLabel(m.role)}`
  }));

  transferMemberDropdown = createDropdown({
    options,
    value: options[0].value,
    className: 'dropdown--full',
    ariaLabel: 'New owner',
    onChange: () => { errorEl.hidden = true; }
  });
  mount.appendChild(transferMemberDropdown.el);
  openOverlay('transfer-overlay');
}

function requestTransferConfirm() {
  const errorEl = document.getElementById('transfer-error');
  if (!transferMemberDropdown) {
    errorEl.textContent = 'You need at least one active teammate to transfer ownership.';
    errorEl.hidden = false;
    return;
  }
  const id = Number(transferMemberDropdown.getValue());
  const m = state.members.find(x => x.id === id);
  if (!m || m.status !== 'active' || m.role === 'owner') {
    errorEl.textContent = 'Pick an active teammate.';
    errorEl.hidden = false;
    return;
  }
  pendingTransferId = id;
  document.getElementById('transfer-confirm-name').textContent = m.name;
  openOverlay('transfer-confirm-overlay');
}

function completeTransferOwnership() {
  const next = state.members.find(x => x.id === pendingTransferId);
  const owner = state.members.find(x => x.role === 'owner');
  if (!next || !owner || next.id === owner.id || next.status !== 'active') {
    pendingTransferId = null;
    closeOverlay('transfer-confirm-overlay');
    return;
  }

  owner.role = 'admin';
  owner.permissions = permissionsForRole('admin');
  next.role = 'owner';
  next.permissions = permissionsForRole('owner');
  next.status = 'active';

  // Keep new owner first in order
  const minOrder = Math.min(...state.members.map(m => m.order ?? 0));
  next.order = minOrder - 1;

  pendingTransferId = null;
  closeOverlay('transfer-confirm-overlay');
  closeOverlay('transfer-overlay');
  renderMembers();
  showToast(`${next.name} is now the workspace owner`);
}

function resendInvite(id) {
  const m = state.members.find(x => x.id === id);
  if (!m) return;
  showToast(`Invite resent to ${m.email}`);
}

function openCancelInvite(id) {
  pendingCancelInviteId = id;
  const m = state.members.find(x => x.id === id);
  if (!m) return;
  document.getElementById('cancel-invite-email').textContent = m.email;
  openOverlay('cancel-invite-overlay');
}

function confirmCancelInvite() {
  const m = state.members.find(x => x.id === pendingCancelInviteId);
  closeOverlay('cancel-invite-overlay');
  if (!m) {
    pendingCancelInviteId = null;
    return;
  }
  state.members = state.members.filter(x => x.id !== pendingCancelInviteId);
  pendingCancelInviteId = null;
  renderMembers();
  showToast(`Invite to ${m.email} cancelled`);
}

function confirmRemove(id) {
  pendingRemoveId = id;
  const m = state.members.find(x => x.id === id);
  if (!m) return;
  document.getElementById('remove-name').textContent = m.name;
  openOverlay('remove-overlay');
}

/* ---------- Drag reorder ---------- */

function getReorderableRows() {
  return [...document.querySelectorAll('#members-list .member-row[data-id]')].filter(row => {
    const m = state.members.find(x => x.id === Number(row.dataset.id));
    return m && m.role !== 'owner';
  });
}

function flipAnimate(beforeRects) {
  const rows = [...document.querySelectorAll('#members-list .member-row[data-id]')];
  rows.forEach(row => {
    const before = beforeRects.get(row.dataset.id);
    if (!before) return;
    const after = row.getBoundingClientRect();
    const dy = before.top - after.top;
    if (Math.abs(dy) < 1) return;
    row.style.transition = 'none';
    row.style.transform = `translateY(${dy}px)`;
    row.getBoundingClientRect();
    row.style.transition = 'transform 160ms cubic-bezier(0.2, 0.8, 0.2, 1)';
    row.style.transform = '';
    const clear = () => {
      row.style.transition = '';
      row.style.transform = '';
      row.removeEventListener('transitionend', clear);
    };
    row.addEventListener('transitionend', clear);
  });
}

function onDragPointerDown(e) {
  if (!reorderMode) return;
  const handleBtn = e.target.closest('[data-drag-id]');
  if (!handleBtn) return;
  e.preventDefault();

  const row = handleBtn.closest('.member-row');
  if (!row) return;
  const id = row.dataset.id;

  const rect = row.getBoundingClientRect();
  dragState = {
    id,
    row,
    startY: e.clientY,
    offsetY: e.clientY - rect.top,
    height: rect.height,
    pointerId: e.pointerId
  };

  row.classList.add('member-row--dragging');
  document.body.classList.add('is-reordering');
  row.style.width = `${rect.width}px`;
  row.style.left = `${rect.left}px`;
  row.style.top = `${rect.top}px`;
  row.style.position = 'fixed';
  row.style.zIndex = '40';
  row.style.pointerEvents = 'none';
  row.style.boxShadow = '6px 6px 0 var(--ink)';
  row.style.transition = 'none';

  const placeholder = document.createElement('div');
  placeholder.className = 'member-row member-row--placeholder';
  placeholder.style.height = `${rect.height}px`;
  placeholder.dataset.placeholder = 'true';
  row.parentNode.insertBefore(placeholder, row.nextSibling);
  dragState.placeholder = placeholder;
  dragState.lastTargetKey = null;

  handleBtn.setPointerCapture?.(e.pointerId);
  window.addEventListener('pointermove', onDragPointerMove);
  window.addEventListener('pointerup', onDragPointerUp);
  window.addEventListener('pointercancel', onDragPointerUp);
}

function onDragPointerMove(e) {
  if (!dragState) return;
  const { row, offsetY, placeholder } = dragState;
  const y = e.clientY - offsetY;
  row.style.top = `${y}px`;

  const others = getReorderableRows().filter(r => r !== row);
  const mid = e.clientY;
  let target = null;
  for (const other of others) {
    const r = other.getBoundingClientRect();
    if (mid < r.top + r.height / 2) {
      target = other;
      break;
    }
  }

  const nextKey = target ? target.dataset.id : '__end__';
  if (dragState.lastTargetKey === nextKey) return;
  dragState.lastTargetKey = nextKey;

  const before = new Map();
  [...document.querySelectorAll('#members-list .member-row[data-id]')]
    .forEach(el => {
      if (el === row) return;
      before.set(el.dataset.id, el.getBoundingClientRect());
    });

  const list = document.getElementById('members-list');
  if (target) {
    list.insertBefore(placeholder, target);
  } else {
    const last = others[others.length - 1];
    if (last) list.insertBefore(placeholder, last.nextSibling);
    else {
      const ownerRow = list.querySelector('.member-row[data-id]');
      if (ownerRow) list.insertBefore(placeholder, ownerRow.nextSibling);
    }
  }

  flipAnimate(before);
}

function onDragPointerUp() {
  if (!dragState) return;
  const { row, placeholder } = dragState;

  window.removeEventListener('pointermove', onDragPointerMove);
  window.removeEventListener('pointerup', onDragPointerUp);
  window.removeEventListener('pointercancel', onDragPointerUp);

  const before = new Map([[row.dataset.id, row.getBoundingClientRect()]]);

  placeholder.parentNode.insertBefore(row, placeholder);
  placeholder.remove();

  row.classList.remove('member-row--dragging');
  document.body.classList.remove('is-reordering');
  row.style.cssText = '';
  flipAnimate(before);

  syncMemberOrderFromDom();
  dragState = null;
}

document.getElementById('members-list').addEventListener('pointerdown', onDragPointerDown);

/* ---------- Permissions modal ---------- */

function openPermissions(id) {
  if (!canManageMembers()) return;
  const m = state.members.find(x => x.id === id);
  if (!m || m.role === 'owner' || m.status === 'pending') return;
  pendingPermissionsId = id;
  document.getElementById('permissions-name').textContent = m.name;

  const list = document.getElementById('permissions-list');
  list.innerHTML = '';
  PERMISSION_DEFS.forEach(def => {
    const row = document.createElement('label');
    row.className = 'perm-row';
    const checked = m.permissions?.[def.key] ? 'checked' : '';
    row.innerHTML = `
      <input type="checkbox" data-perm="${def.key}" ${checked}>
      <span>${escapeHtml(def.label)}</span>
    `;
    list.appendChild(row);
  });

  openOverlay('permissions-overlay');
}

document.getElementById('permissions-list').addEventListener('change', (e) => {
  const input = e.target.closest('input[data-perm]');
  if (!input) return;
  const m = state.members.find(x => x.id === pendingPermissionsId);
  if (!m || m.role === 'owner') return;

  const key = input.dataset.perm;
  const def = PERMISSION_DEFS.find(p => p.key === key);
  if (!m.permissions) m.permissions = permissionsForRole(m.role);
  m.permissions[key] = input.checked;

  const who = shortName(m.name);
  showToast(input.checked
    ? `${who} can now ${def.toast}`
    : `${who} can no longer ${def.toast}`);
});

document.getElementById('permissions-done').addEventListener('click', () => {
  closeOverlay('permissions-overlay');
  pendingPermissionsId = null;
});

document.getElementById('welcome-join-continue').addEventListener('click', () => {
  closeOverlay('welcome-join-overlay');
  showToast('Welcome to the workspace');
});

/* ---------- Invite ---------- */

function openInviteModal() {
  if (!canManageMembers()) return;
  document.getElementById('invite-email').value = '';
  inviteRoleDropdown.setValue('member');
  document.getElementById('invite-error').hidden = true;
  openOverlay('invite-overlay');
  document.getElementById('invite-email').focus();
}

const OVERLAY_MS = 280;

function forceHideOverlay(ov) {
  if (!ov) return;
  clearTimeout(ov._overlayCloseTimer);
  ov._overlayCloseTimer = null;
  ov.classList.remove('overlay--open', 'overlay--closing');
  ov.hidden = true;
}

function openOverlay(id) {
  closeOpenDropdown();
  closeRowMenu();
  const el = document.getElementById(id);
  if (!el) return;
  clearTimeout(el._overlayCloseTimer);
  el._overlayCloseTimer = null;
  el.classList.remove('overlay--closing', 'overlay--open');
  el.hidden = false;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!el.hidden) el.classList.add('overlay--open');
    });
  });
}

function closeOverlay(id) {
  const el = document.getElementById(id);
  if (!el || el.hidden) return;

  const finish = () => {
    clearTimeout(el._overlayCloseTimer);
    el._overlayCloseTimer = null;
    el.classList.remove('overlay--open', 'overlay--closing');
    el.hidden = true;
  };

  if (!el.classList.contains('overlay--open')) {
    finish();
    return;
  }

  el.classList.remove('overlay--open');
  el.classList.add('overlay--closing');
  clearTimeout(el._overlayCloseTimer);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el._overlayCloseTimer = setTimeout(finish, reduced ? 0 : OVERLAY_MS);
}

function closeAllOverlays({ immediate = true } = {}) {
  closeOpenDropdown();
  closeRowMenu();
  document.querySelectorAll('.overlay').forEach(ov => {
    if (immediate) forceHideOverlay(ov);
    else closeOverlay(ov.id);
  });
  pendingRemoveId = null;
  pendingDeactivateId = null;
  pendingCancelInviteId = null;
  pendingPermissionsId = null;
  pendingPlanId = null;
  pendingTransferId = null;
  pendingInvoiceId = null;
  invoiceFromHistory = false;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => { t.hidden = true; }, 2600);
}

function sendInvite() {
  const emailInput = document.getElementById('invite-email');
  const errorEl = document.getElementById('invite-error');
  const role = inviteRoleDropdown.getValue();
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errorEl.textContent = 'Enter an email address.';
    errorEl.hidden = false;
    emailInput.focus();
    return;
  }
  if (!emailPattern.test(email)) {
    errorEl.textContent = 'Enter a valid email address.';
    errorEl.hidden = false;
    emailInput.focus();
    return;
  }
  const exists = state.members.some(m => m.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    errorEl.textContent = 'This email is already part of the workspace.';
    errorEl.hidden = false;
    emailInput.focus();
    return;
  }

  state.members.push({
    id: nextId++,
    name: email,
    email,
    role,
    status: 'pending',
    order: state.members.length,
    permissions: permissionsForRole(role)
  });
  closeOverlay('invite-overlay');
  renderMembers();
  showToast(`Invite sent to ${email}`);
}

function switchTab(key) {
  closeOpenDropdown();
  const current = document.querySelector('.panel:not([hidden])');
  const nextId = `tab-${key}`;
  const next = document.getElementById(nextId);
  if (!next || (current && current.id === nextId)) {
    document.querySelectorAll('.tab').forEach(t => {
      const active = t.dataset.tab === key;
      t.classList.toggle('tab--active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    if (key === 'billing') renderBilling();
    return;
  }

  document.querySelectorAll('.tab').forEach(t => {
    const active = t.dataset.tab === key;
    t.classList.toggle('tab--active', active);
    t.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  const showNext = () => {
    document.getElementById('tab-general').hidden = key !== 'general';
    document.getElementById('tab-members').hidden = key !== 'members';
    document.getElementById('tab-billing').hidden = key !== 'billing';
    next.classList.remove('panel--enter');
    void next.offsetWidth;
    next.classList.add('panel--enter');
    if (key === 'billing') renderBilling();
  };

  if (current && !current.hidden) {
    current.classList.add('panel--leave');
    window.setTimeout(() => {
      current.classList.remove('panel--leave', 'panel--enter');
      showNext();
    }, 140);
  } else {
    showNext();
  }
}

/* ---------- Billing ---------- */

function renderBilling() {
  const plan = currentPlan();
  const used = seatsUsed();
  const canceling = state.billing.status === 'canceling';
  const manageBilling = canManageBilling();
  const isOther = viewAs === 'other';

  // Other: plan summary lives under General
  if (isOther) {
    document.getElementById('plan-details-name').textContent = plan.name;
    document.getElementById('plan-details-seats').textContent = `${used} of ${plan.seats} seats used`;
    const detailsBadge = document.getElementById('plan-details-badge');
    detailsBadge.textContent = canceling ? 'Canceling' : 'Active';
    detailsBadge.classList.toggle('plan-badge--canceling', canceling);
    return;
  }

  const badge = document.getElementById('plan-badge');
  const billLabel = document.getElementById('plan-bill-label');
  const cancelNote = document.getElementById('plan-cancel-note');
  const cancelBtn = document.getElementById('cancel-plan-btn');
  const keepBtn = document.getElementById('keep-plan-btn');
  const billingSub = document.getElementById('billing-panel-sub');

  document.getElementById('plan-card').hidden = false;

  document.getElementById('plan-name').textContent = plan.name;
  document.getElementById('plan-name-icon').innerHTML = iconSvg(plan.id);
  document.getElementById('plan-price').textContent = canceling
    ? `$${plan.price}/mo · Cancels ${state.billing.nextBillingDate}`
    : `$${plan.price}/mo · Billed monthly`;
  document.getElementById('plan-seats').textContent = `${used} of ${plan.seats} seats used`;

  if (canceling) {
    badge.textContent = 'Canceling';
    badge.classList.add('plan-badge--canceling');
    billLabel.textContent = 'Access until';
    document.getElementById('plan-next-bill').textContent = state.billing.nextBillingDate;
    cancelNote.hidden = false;
    cancelBtn.hidden = true;
    keepBtn.hidden = !manageBilling;
  } else {
    badge.textContent = 'Active';
    badge.classList.remove('plan-badge--canceling');
    billLabel.textContent = 'Next billing date';
    document.getElementById('plan-next-bill').textContent = state.billing.nextBillingDate;
    cancelNote.hidden = true;
    cancelBtn.hidden = !manageBilling;
    keepBtn.hidden = true;
  }

  document.getElementById('change-plan-btn').hidden = !manageBilling;
  const managePaymentBtn = document.getElementById('manage-payment-btn');
  if (managePaymentBtn) managePaymentBtn.hidden = !manageBilling;
  if (!manageBilling) {
    cancelBtn.hidden = true;
    keepBtn.hidden = true;
  }

  const pm = state.billing.paymentMethod;
  document.getElementById('plan-payment').textContent = `${pm.brand} ending in ${pm.last4}`;

  if (billingSub) {
    billingSub.textContent = 'Manage your plan, seats, and payment method.';
  }

  renderBillingHistoryPreview();
}

function formatMoney(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function getInvoice(id) {
  return state.billing.invoices.find(inv => inv.id === id) || null;
}

function renderBillingHistoryPreview() {
  const list = document.getElementById('billing-history-list');
  if (!list) return;
  const preview = state.billing.invoices.slice(0, 3);
  list.innerHTML = preview.map(inv => `
    <li>
      <button type="button" class="billing-history__row" data-action="view-invoice" data-invoice-id="${escapeHtml(inv.id)}">
        <span class="billing-history__meta">${escapeHtml(inv.date)} · ${escapeHtml(inv.planName)}</span>
        <span class="billing-history__amount">${formatMoney(inv.amount)}</span>
      </button>
    </li>
  `).join('');
}

function renderBillingHistoryList() {
  const list = document.getElementById('invoice-history-list');
  list.innerHTML = state.billing.invoices.map(inv => `
    <li>
      <div class="invoice-history-list__main">
        <p class="invoice-history-list__title">${escapeHtml(inv.number)}</p>
        <p class="invoice-history-list__meta">${escapeHtml(inv.date)} · ${escapeHtml(inv.planName)} · ${escapeHtml(inv.status)}</p>
      </div>
      <span class="invoice-history-list__amount">${formatMoney(inv.amount)}</span>
      <div class="invoice-history-list__actions">
        <button type="button" class="btn" data-action="view-invoice" data-invoice-id="${escapeHtml(inv.id)}">View</button>
      </div>
    </li>
  `).join('');
}

function openBillingHistory() {
  renderBillingHistoryList();
  openOverlay('billing-history-overlay');
}

function openInvoice(id, fromHistory = false) {
  const inv = getInvoice(id);
  if (!inv) return;
  pendingInvoiceId = id;
  invoiceFromHistory = fromHistory;

  const isDue = inv.status === 'Due';
  document.getElementById('invoice-title').textContent = `Invoice ${inv.number}`;
  document.getElementById('invoice-lead').textContent = isDue
    ? `This invoice is due. Pay on site or export a copy for your records.`
    : `Full breakdown for the ${inv.planName} plan billed on ${inv.date}.`;
  document.getElementById('invoice-back').hidden = !fromHistory;
  const payBtn = document.getElementById('invoice-pay');
  const exportBtn = document.getElementById('invoice-export');
  const canPay = isDue && canManageBilling();
  payBtn.hidden = !canPay;
  exportBtn.hidden = false;
  exportBtn.classList.toggle('btn--primary', !canPay);

  const total = inv.amount + inv.tax;
  const statusClass = isDue ? 'invoice-sheet__status invoice-sheet__status--due' : 'invoice-sheet__status';
  document.getElementById('invoice-sheet').innerHTML = `
    <div class="invoice-sheet__top">
      <p class="invoice-sheet__number">${escapeHtml(inv.number)}</p>
      <span class="${statusClass}">${escapeHtml(inv.status)}</span>
    </div>
    <dl class="invoice-sheet__rows">
      <div class="invoice-sheet__row"><dt>Invoice date</dt><dd>${escapeHtml(inv.date)}</dd></div>
      <div class="invoice-sheet__row"><dt>Billing period</dt><dd>${escapeHtml(inv.period)}</dd></div>
      <div class="invoice-sheet__row"><dt>Payment method</dt><dd>${escapeHtml(inv.payment)}</dd></div>
    </dl>
    <div class="invoice-sheet__line">
      <span>${escapeHtml(inv.planName)} plan · monthly</span>
      <span>${formatMoney(inv.amount)}</span>
    </div>
    <div class="invoice-sheet__totals">
      <div class="invoice-sheet__total"><span>Subtotal</span><span>${formatMoney(inv.amount)}</span></div>
      <div class="invoice-sheet__total"><span>Tax</span><span>${formatMoney(inv.tax)}</span></div>
      <div class="invoice-sheet__total invoice-sheet__total--grand"><span>${isDue ? 'Amount due' : 'Total paid'}</span><span>${formatMoney(total)}</span></div>
    </div>
  `;

  if (fromHistory) closeOverlay('billing-history-overlay');
  openOverlay('invoice-overlay');
}

function exportInvoice(id) {
  const inv = getInvoice(id);
  if (!inv) return;
  showToast(`Exported ${inv.number} as PDF`);
}

function exportAllInvoices() {
  const count = state.billing.invoices.length;
  showToast(`Exported ${count} invoice${count === 1 ? '' : 's'} as PDF`);
}

function closeInvoiceModal() {
  closeOverlay('invoice-overlay');
  pendingInvoiceId = null;
  invoiceFromHistory = false;
}

function detectCardBrand(digits) {
  if (/^4/.test(digits)) return 'Visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'Amex';
  return 'Card';
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function resetPaymentForm() {
  document.getElementById('pay-name').value = '';
  document.getElementById('pay-number').value = '';
  document.getElementById('pay-expiry').value = '';
  document.getElementById('pay-cvc').value = '';
  document.getElementById('payment-error').hidden = true;
}

function getDueInvoice() {
  return state.billing.invoices.find(inv => inv.status === 'Due') || null;
}

function ensureEndOfCycleInvoice() {
  if (getDueInvoice()) return;
  const plan = currentPlan();
  const pm = state.billing.paymentMethod;
  state.billing.invoices.unshift({
    id: `inv-due-${Date.now()}`,
    number: 'INV-DUE',
    date: state.billing.nextBillingDate,
    period: `Through ${state.billing.nextBillingDate}`,
    planName: plan.name,
    amount: plan.price,
    tax: 0,
    status: 'Due',
    payment: `${pm.brand} ···· ${pm.last4}`
  });
}

function clearDueInvoices() {
  state.billing.invoices = state.billing.invoices.filter(inv => inv.status !== 'Due');
}

function openPaymentModal(options = {}) {
  if (!canManageBilling()) return;
  const { preferPay = false, fromInvoice = false } = options;
  paymentFromInvoice = fromInvoice;
  resetPaymentForm();

  const pm = state.billing.paymentMethod;
  const due = getDueInvoice();
  document.getElementById('payment-current-value').textContent = `${pm.brand} ending in ${pm.last4}`;

  const dueNote = document.getElementById('payment-due-note');
  const payBtn = document.getElementById('payment-pay');
  const submitBtn = document.getElementById('payment-submit');

  if (due) {
    dueNote.classList.add('payment-due-note--due');
    dueNote.innerHTML = `Payment due for <strong>${escapeHtml(due.number)}</strong> · ${formatMoney(due.amount + due.tax)}. Pay at the end of your cycle.`;
    payBtn.hidden = false;
    payBtn.innerHTML = `${iconSvg('card')}<span>Pay ${formatMoney(due.amount + due.tax)}</span>`;
    paymentIntent = preferPay || fromInvoice ? 'pay' : 'save';
  } else {
    dueNote.classList.remove('payment-due-note--due');
    dueNote.innerHTML = `No payment due. Your next charge is on <strong>${escapeHtml(state.billing.nextBillingDate)}</strong>.`;
    payBtn.hidden = true;
    paymentIntent = 'save';
  }

  submitBtn.innerHTML = `${iconSvg('card')}<span>Save card</span>`;
  const emphasizePay = Boolean(due) && (preferPay || fromInvoice);
  submitBtn.classList.toggle('btn--primary', !emphasizePay);
  payBtn.classList.toggle('btn--primary', emphasizePay);

  if (fromInvoice) closeOverlay('invoice-overlay');
  openOverlay('payment-overlay');
  document.getElementById('pay-name').focus();
}

function validatePaymentForm() {
  const name = document.getElementById('pay-name').value.trim();
  const numberRaw = document.getElementById('pay-number').value.replace(/\s/g, '');
  const expiry = document.getElementById('pay-expiry').value.trim();
  const cvc = document.getElementById('pay-cvc').value.trim();
  const errorEl = document.getElementById('payment-error');

  if (!name) {
    errorEl.textContent = 'Enter the name on the card.';
    errorEl.hidden = false;
    document.getElementById('pay-name').focus();
    return null;
  }
  if (!/^\d{13,16}$/.test(numberRaw)) {
    errorEl.textContent = 'Enter a valid card number.';
    errorEl.hidden = false;
    document.getElementById('pay-number').focus();
    return null;
  }
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    errorEl.textContent = 'Use MM/YY for the expiry date.';
    errorEl.hidden = false;
    document.getElementById('pay-expiry').focus();
    return null;
  }
  if (!/^\d{3,4}$/.test(cvc)) {
    errorEl.textContent = 'Enter a valid CVC.';
    errorEl.hidden = false;
    document.getElementById('pay-cvc').focus();
    return null;
  }

  errorEl.hidden = true;
  return {
    brand: detectCardBrand(numberRaw),
    last4: numberRaw.slice(-4)
  };
}

function savePaymentCard() {
  const card = validatePaymentForm();
  if (!card) return;
  state.billing.paymentMethod = { brand: card.brand, last4: card.last4 };
  closeOverlay('payment-overlay');
  showToast(`Card updated · ${card.brand} ending in ${card.last4}`);
  renderBilling();
}

function payDueInvoice() {
  const due = getDueInvoice();
  if (!due) {
    showToast('No payment due right now');
    return;
  }

  const numberRaw = document.getElementById('pay-number').value.replace(/\s/g, '');
  let brand = state.billing.paymentMethod.brand;
  let last4 = state.billing.paymentMethod.last4;

  // If the form is filled, use/update the card; otherwise charge the saved card
  if (numberRaw || document.getElementById('pay-name').value.trim()) {
    const card = validatePaymentForm();
    if (!card) return;
    brand = card.brand;
    last4 = card.last4;
    state.billing.paymentMethod = { brand, last4 };
  }

  due.status = 'Paid';
  due.payment = `${brand} ···· ${last4}`;
  closeOverlay('payment-overlay');
  showToast(`Paid ${due.number} · ${brand} ···· ${last4}`);
  renderBilling();
  if (invoiceFromHistory) openBillingHistory();
  else if (pendingInvoiceId) openInvoice(pendingInvoiceId, false);
}

function renderPlanTiers() {
  const wrap = document.getElementById('plan-tiers');
  wrap.innerHTML = '';
  Object.values(PLANS).forEach(plan => {
    const isCurrent = plan.id === state.billing.planId;
    const card = document.createElement('div');
    card.className = 'plan-tier' + (isCurrent ? ' plan-tier--current' : '');
    card.innerHTML = `
      <div class="plan-tier__head">
        <h3 class="plan-tier__name">${iconSvg(plan.id)}<span>${escapeHtml(plan.name)}</span></h3>
        <p class="plan-tier__price">$${plan.price}<span>/mo</span></p>
      </div>
      <p class="plan-tier__seats">${plan.seats} seat${plan.seats === 1 ? '' : 's'}</p>
      <ul class="plan-tier__features">
        ${plan.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
      </ul>
      <button
        type="button"
        class="btn ${isCurrent ? '' : 'btn--primary'} plan-tier__btn"
        data-plan-id="${plan.id}"
        ${isCurrent ? 'disabled' : ''}
      >${isCurrent ? 'Current plan' : `Switch to ${escapeHtml(plan.name)}`}</button>
    `;
    wrap.appendChild(card);
  });
}

function openChangePlan() {
  if (!canManageBilling()) return;
  document.getElementById('plan-switch-error').hidden = true;
  document.getElementById('simulate-decline').checked = false;
  renderPlanTiers();
  openOverlay('change-plan-overlay');
}

function requestPlanSwitch(planId) {
  const target = PLANS[planId];
  if (!target || target.id === state.billing.planId) return;

  document.getElementById('plan-switch-error').hidden = true;
  const used = seatsUsed();

  if (used > target.seats) {
    document.getElementById('plan-block-body').textContent =
      `You have ${used} members but ${target.name} only includes ${target.seats} seat${target.seats === 1 ? '' : 's'}. Remove members before switching, or choose a different plan.`;
    openOverlay('plan-block-overlay');
    return;
  }

  pendingPlanId = planId;
  document.getElementById('plan-confirm-name').textContent = target.name;
  document.getElementById('plan-confirm-body').textContent =
    `You'll move to ${target.name} at $${target.price}/mo with ${target.seats} seats. Your next bill stays on ${state.billing.nextBillingDate}.`;
  openOverlay('plan-confirm-overlay');
}

function completePlanSwitch() {
  const target = PLANS[pendingPlanId];
  if (!target) return;

  const simulateDecline = document.getElementById('simulate-decline').checked;
  const randomDecline = !simulateDecline && Math.random() < 0.2;

  if (simulateDecline || randomDecline) {
    closeOverlay('plan-confirm-overlay');
    pendingPlanId = null;
    const err = document.getElementById('plan-switch-error');
    err.textContent = 'Your card was declined. Update your payment method to continue.';
    err.hidden = false;
    return;
  }

  state.billing.planId = target.id;
  state.billing.status = 'active';
  closeOverlay('plan-confirm-overlay');
  closeOverlay('change-plan-overlay');
  pendingPlanId = null;
  renderBilling();
  showToast(`Switched to ${target.name} plan`);
}

function openCancelPlan() {
  if (!canManageBilling()) return;
  if (state.billing.status === 'canceling') return;
  const plan = currentPlan();
  document.getElementById('cancel-plan-name').textContent = plan.name;
  document.getElementById('cancel-plan-date').textContent = state.billing.nextBillingDate;
  openOverlay('cancel-plan-overlay');
}

function confirmCancelPlan() {
  state.billing.status = 'canceling';
  ensureEndOfCycleInvoice();
  closeOverlay('cancel-plan-overlay');
  renderBilling();
  showToast(`Plan canceled · final payment due by ${state.billing.nextBillingDate}`);
}

function keepPlan() {
  state.billing.status = 'active';
  clearDueInvoices();
  renderBilling();
  showToast('Your plan will renew as usual');
}

document.getElementById('change-plan-btn').addEventListener('click', openChangePlan);
document.getElementById('change-plan-close').addEventListener('click', () => {
  closeOverlay('change-plan-overlay');
});

document.getElementById('cancel-plan-btn').addEventListener('click', openCancelPlan);
document.getElementById('cancel-plan-dismiss').addEventListener('click', () => {
  closeOverlay('cancel-plan-overlay');
});
document.getElementById('cancel-plan-confirm').addEventListener('click', confirmCancelPlan);
document.getElementById('keep-plan-btn').addEventListener('click', keepPlan);
document.getElementById('plan-tiers').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-plan-id]');
  if (!btn || btn.disabled) return;
  requestPlanSwitch(btn.dataset.planId);
});

document.getElementById('plan-confirm-cancel').addEventListener('click', () => {
  closeOverlay('plan-confirm-overlay');
  pendingPlanId = null;
});

document.getElementById('plan-confirm-ok').addEventListener('click', completePlanSwitch);

document.getElementById('plan-block-ok').addEventListener('click', () => {
  closeOverlay('plan-block-overlay');
});

document.getElementById('manage-payment-btn').addEventListener('click', () => {
  openPaymentModal();
});
document.getElementById('payment-cancel').addEventListener('click', () => {
  const fromInvoice = paymentFromInvoice;
  const id = pendingInvoiceId;
  const fromHistory = invoiceFromHistory;
  paymentFromInvoice = false;
  closeOverlay('payment-overlay');
  if (fromInvoice && id) openInvoice(id, fromHistory);
});
document.getElementById('payment-submit').addEventListener('click', savePaymentCard);
document.getElementById('payment-pay').addEventListener('click', payDueInvoice);
document.getElementById('pay-number').addEventListener('input', (e) => {
  e.target.value = formatCardNumber(e.target.value);
  document.getElementById('payment-error').hidden = true;
});
document.getElementById('pay-expiry').addEventListener('input', (e) => {
  e.target.value = formatExpiry(e.target.value);
  document.getElementById('payment-error').hidden = true;
});
['pay-name', 'pay-cvc'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById('payment-error').hidden = true;
  });
});

document.getElementById('view-billing-history-btn').addEventListener('click', openBillingHistory);
document.getElementById('billing-history-close').addEventListener('click', () => {
  closeOverlay('billing-history-overlay');
});
document.getElementById('billing-history-export-all').addEventListener('click', exportAllInvoices);
document.getElementById('invoice-export').addEventListener('click', () => {
  if (pendingInvoiceId) exportInvoice(pendingInvoiceId);
});
document.getElementById('invoice-pay').addEventListener('click', () => {
  openPaymentModal({ preferPay: true, fromInvoice: true });
});
document.getElementById('invoice-back').addEventListener('click', () => {
  closeInvoiceModal();
  openBillingHistory();
});

document.getElementById('billing-history').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="view-invoice"]');
  if (!btn) return;
  openInvoice(btn.dataset.invoiceId, false);
});

document.getElementById('invoice-history-list').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="view-invoice"]');
  if (!btn) return;
  openInvoice(btn.dataset.invoiceId, true);
});

/* ---------- Shared listeners (existing flows) ---------- */

document.getElementById('members-list').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  closeRowMenu();
  switch (btn.dataset.action) {
    case 'invite':
      openInviteModal();
      break;
    case 'resend':
      resendInvite(id);
      break;
    case 'cancel-invite':
      openCancelInvite(id);
      break;
    case 'remove':
      confirmRemove(id);
      break;
    case 'permissions':
      openPermissions(id);
      break;
    case 'deactivate':
      confirmDeactivate(id);
      break;
    case 'activate':
      activateMember(id);
      break;
    case 'transfer-ownership':
      openTransferOwnership();
      break;
  }
});

document.getElementById('reorder-btn').addEventListener('click', enterReorderMode);
document.getElementById('done-reorder-btn').addEventListener('click', exitReorderMode);
document.getElementById('remove-cancel').addEventListener('click', () => {
  closeOverlay('remove-overlay');
  pendingRemoveId = null;
});

document.getElementById('remove-confirm').addEventListener('click', () => {
  const m = state.members.find(x => x.id === pendingRemoveId);
  closeOverlay('remove-overlay');
  if (!m) {
    pendingRemoveId = null;
    return;
  }
  state.members = state.members.filter(x => x.id !== pendingRemoveId);
  pendingRemoveId = null;
  renderMembers();
  showToast(`${m.name} removed`);
});

document.getElementById('deactivate-cancel').addEventListener('click', () => {
  closeOverlay('deactivate-overlay');
  pendingDeactivateId = null;
});

document.getElementById('deactivate-confirm').addEventListener('click', () => {
  const id = pendingDeactivateId;
  closeOverlay('deactivate-overlay');
  if (id != null) deactivateMember(id);
});

document.getElementById('transfer-cancel').addEventListener('click', () => {
  closeOverlay('transfer-overlay');
  pendingTransferId = null;
});

document.getElementById('transfer-confirm').addEventListener('click', requestTransferConfirm);

document.getElementById('transfer-confirm-cancel').addEventListener('click', () => {
  closeOverlay('transfer-confirm-overlay');
  pendingTransferId = null;
});

document.getElementById('transfer-confirm-ok').addEventListener('click', completeTransferOwnership);
document.getElementById('cancel-invite-dismiss').addEventListener('click', () => {
  closeOverlay('cancel-invite-overlay');
  pendingCancelInviteId = null;
});

document.getElementById('cancel-invite-confirm').addEventListener('click', confirmCancelInvite);

document.getElementById('invite-btn').addEventListener('click', openInviteModal);

document.getElementById('invite-cancel').addEventListener('click', () => {
  closeOverlay('invite-overlay');
});

document.getElementById('invite-email').addEventListener('input', () => {
  document.getElementById('invite-error').hidden = true;
});

document.getElementById('invite-email').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendInvite();
  }
});

document.getElementById('invite-send').addEventListener('click', sendInvite);

document.getElementById('general-save').addEventListener('click', () => {
  const name = document.getElementById('workspace-name').value.trim();
  if (!name) {
    showToast('Workspace name can’t be empty');
    document.getElementById('workspace-name').focus();
    return;
  }
  showToast('Workspace settings saved');
});

function workspaceSlug() {
  return document.getElementById('workspace-url').value.trim().toLowerCase();
}

function openDeleteWorkspace() {
  if (viewAs !== 'owner') return;
  const slug = workspaceSlug() || 'studio-co';
  const name = document.getElementById('workspace-name').value.trim() || 'this workspace';
  document.getElementById('delete-workspace-name').textContent = name;
  document.getElementById('delete-workspace-slug-hint').textContent = slug;
  const input = document.getElementById('delete-workspace-slug');
  input.value = '';
  input.placeholder = slug;
  document.getElementById('delete-workspace-error').hidden = true;
  document.getElementById('delete-workspace-confirm').disabled = true;
  openOverlay('delete-workspace-overlay');
  input.focus();
}

function syncDeleteWorkspaceConfirm() {
  const slug = workspaceSlug() || 'studio-co';
  const typed = document.getElementById('delete-workspace-slug').value.trim();
  const matches = typed === slug;
  document.getElementById('delete-workspace-confirm').disabled = !matches;
  if (matches) document.getElementById('delete-workspace-error').hidden = true;
}

function confirmDeleteWorkspace() {
  const slug = workspaceSlug() || 'studio-co';
  const name = document.getElementById('workspace-name').value.trim() || slug;
  const typed = document.getElementById('delete-workspace-slug').value.trim();
  const errorEl = document.getElementById('delete-workspace-error');
  if (typed !== slug) {
    errorEl.textContent = `Type ${slug} exactly to confirm.`;
    errorEl.hidden = false;
    document.getElementById('delete-workspace-slug').focus();
    return;
  }
  closeOverlay('delete-workspace-overlay');
  closeAllOverlays();
  beginWorkspaceDeletion(name, slug);
}

function beginWorkspaceDeletion(name, slug) {
  const shell = document.querySelector('.app-shell');
  const screen = document.getElementById('workspace-gone');
  const deleting = document.getElementById('workspace-gone-deleting');
  const deleted = document.getElementById('workspace-gone-deleted');

  document.getElementById('workspace-gone-deleting-sub').textContent =
    `Removing ${name} · tandem.app/${slug}`;
  document.getElementById('workspace-gone-sub').textContent =
    `“${slug}” has been removed. You can bring it back if this was a mistake.`;

  shell.hidden = true;
  screen.hidden = false;
  deleting.hidden = false;
  deleted.hidden = true;
  screen.classList.add('workspace-gone--active');
  document.body.classList.add('workspace-is-deleted');

  window.setTimeout(() => {
    deleting.hidden = true;
    deleted.hidden = false;
    deleted.classList.add('workspace-gone__deleted--in');
  }, 1100);
}

function restoreWorkspace() {
  const shell = document.querySelector('.app-shell');
  const screen = document.getElementById('workspace-gone');
  const deleting = document.getElementById('workspace-gone-deleting');
  const deleted = document.getElementById('workspace-gone-deleted');

  deleted.classList.remove('workspace-gone__deleted--in');
  deleted.hidden = true;
  deleting.hidden = true;
  screen.hidden = true;
  screen.classList.remove('workspace-gone--active');
  document.body.classList.remove('workspace-is-deleted');
  shell.hidden = false;
  switchTab('general');
  showToast('Workspace restored');
}

document.getElementById('delete-workspace-btn').addEventListener('click', openDeleteWorkspace);
document.getElementById('delete-workspace-cancel').addEventListener('click', () => {
  closeOverlay('delete-workspace-overlay');
});
document.getElementById('delete-workspace-slug').addEventListener('input', syncDeleteWorkspaceConfirm);
document.getElementById('delete-workspace-slug').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (!document.getElementById('delete-workspace-confirm').disabled) confirmDeleteWorkspace();
  }
});
document.getElementById('delete-workspace-confirm').addEventListener('click', confirmDeleteWorkspace);
document.getElementById('restore-workspace-btn').addEventListener('click', restoreWorkspace);

document.querySelectorAll('.overlay').forEach(ov => {
  const modal = ov.querySelector('.modal');
  if (modal && !modal.querySelector('.modal__close')) {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'modal__close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = iconSvg('cancel');
    modal.prepend(closeBtn);
  }

  ov.addEventListener('click', (e) => {
    if (e.target !== ov && !e.target.closest('.modal__close')) return;
    closeOverlay(ov.id);
    pendingRemoveId = null;
    pendingDeactivateId = null;
    pendingCancelInviteId = null;
    pendingPermissionsId = null;
    pendingTransferId = null;
    if (ov.id === 'plan-confirm-overlay') pendingPlanId = null;
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (openDropdown) {
    closeOpenDropdown();
    return;
  }
  if (openRowMenu) {
    closeRowMenu();
    return;
  }
  if (reorderMode) {
    exitReorderMode();
    return;
  }
  const openPopups = [...document.querySelectorAll('.overlay:not([hidden])')];
  if (openPopups.length) {
    closeAllOverlays({ immediate: false });
    return;
  }
  closeAllOverlays();
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

/* ---------- Init ---------- */

inviteRoleDropdown = createDropdown({
  options: INVITE_ROLE_OPTIONS,
  value: 'member',
  className: 'dropdown--full',
  ariaLabel: 'Invite role',
  onChange: () => {}
});
document.getElementById('invite-role').appendChild(inviteRoleDropdown.el);
document.getElementById('invite-role-label').setAttribute('for', '');

hydrateIcons();
applyViewAs();
