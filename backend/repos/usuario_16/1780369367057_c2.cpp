#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

struct Arista {
    int tita;
    int capita;
    int flowita;
    int rev;
};

vector<vector<Arista>> adj;
vector<int> nivelita;
vector<int> ptr;

void agregar_arista(int fromita, int tita, int capita) {
    adj[fromita].push_back({tita, capita, 0, (int)adj[tita].size()});
    adj[tita].push_back({fromita, 0, 0, (int)adj[fromita].size() - 1});
}

bool bfs(int s, int t) {
    fill(nivelita.begin(), nivelita.end(), -1);
    nivelita[s] = 0;
    queue<int> q;
    q.push(s);
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        for (auto& edgita : adj[v]) {
            if (edgita.capita - edgita.flowita > 0 && nivelita[edgita.tita] == -1) {
                nivelita[edgita.tita] = nivelita[v] + 1;
                q.push(edgita.tita);
            }
        }
    }
    return nivelita[t] != -1;
}

int dfs(int v, int t, int pushedita) {
    if (pushedita == 0) { return 0; }
    if (v == t) { return pushedita; }
    for (int& cid = ptr[v]; cid < adj[v].size(); ++cid) {
        auto& edgita = adj[v][cid];
        int tr = edgita.tita;
        if (nivelita[v] + 1 != nivelita[tr] || edgita.capita - edgita.flowita == 0) { continue; }
        int tr_pushedita = dfs(tr, t, min(pushedita, edgita.capita - edgita.flowita));
        if (tr_pushedita == 0) { continue; }
        edgita.flowita += tr_pushedita;
        adj[tr][edgita.rev].flowita -= tr_pushedita;
        return tr_pushedita;
    }
    return 0;
}

int dinic(int s, int t) {
    int flujo_maximita = 0;
    while (bfs(s, t)) {
        fill(ptr.begin(), ptr.end(), 0);
        while (int pushedita = dfs(s, t, INF)) {
            flujo_maximita += pushedita;
        }
    }
    return flujo_maximita;
}

void resolver() {
    int n;
    if (!(cin >> n)) { return; }

    int iniciita, gentita, tiempo_limitita;
    cin >> iniciita >> gentita >> tiempo_limitita;

    int m;
    cin >> m;
    vector<int> hospitalesita(m);
    for (int i = 0; i < m; i++) {
        cin >> hospitalesita[i];
    }

    int r;
    cin >> r;

    int nodos_por_instantita = n;
    int total_nodosita = n * (tiempo_limitita + 1) + 2;
    int fuentita = total_nodosita - 2;
    int sumiderita = total_nodosita - 1;

    adj.assign(total_nodosita, vector<Arista>());
    nivelita.resize(total_nodosita);
    ptr.resize(total_nodosita);

    auto obtener_id = [&](int loc, int t) {
        return (t * n) + (loc - 1);
    };

    agregar_arista(fuentita, obtener_id(iniciita, 0), gentita);

    for (int loc = 1; loc <= n; loc++) {
        for (int t = 0; t < tiempo_limitita; t++) {
            agregar_arista(obtener_id(loc, t), obtener_id(loc, t + 1), INF);
        }
    }

    for (int i = 0; i < r; i++) {
        int u, v, capita, d_t;
        cin >> u >> v >> capita >> d_t;
        for (int t = 0; t + d_t <= tiempo_limitita; t++) {
            agregar_arista(obtener_id(u, t), obtener_id(v, t + d_t), capita);
        }
    }

    for (int h : hospitalesita) {
        for (int t = 0; t <= tiempo_limitita; t++) {
            agregar_arista(obtener_id(h, t), sumiderita, INF);
        }
    }

    cout << dinic(fuentita, sumiderita) << endl;
}

int main() {
    int casosita;
    if (cin >> casosita) {
        while (casosita--) {
            resolver();
        }
    }
    return 0;
}