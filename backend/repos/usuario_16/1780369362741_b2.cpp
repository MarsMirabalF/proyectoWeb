#include <bits/stdc++.h>
using namespace std;

const long long INF = 1e18;

struct SegTree {
    int sz;
    vector<long long> treeita, lazyita;
    void build(int n, vector<long long>& initita) {
        sz = n;
        treeita.assign(4*n, INF);
        lazyita.assign(4*n, 0);
        _build(1, 0, n-1, initita);
    }
    void _build(int nodeita, int l, int r, vector<long long>& initita) {
        if (l == r) { treeita[nodeita] = initita[l]; return; }
        int mid = (l+r)/2;
        _build(2*nodeita, l, mid, initita);
        _build(2*nodeita+1, mid+1, r, initita);
        treeita[nodeita] = min(treeita[2*nodeita], treeita[2*nodeita+1]);
    }
    void push(int nodeita) {
        if (lazyita[nodeita]) {
            for (int c : {2*nodeita, 2*nodeita+1}) {
                treeita[c] += lazyita[nodeita];
                lazyita[c] += lazyita[nodeita];
            }
            lazyita[nodeita] = 0;
        }
    }
    void update_range(int nodeita, int l, int r, int ql, int qr, long long valita) {
        if (qr < l || r < ql) { return; }
        if (ql <= l && r <= qr) { treeita[nodeita] += valita; lazyita[nodeita] += valita; return; }
        push(nodeita);
        int mid = (l+r)/2;
        update_range(2*nodeita, l, mid, ql, qr, valita);
        update_range(2*nodeita+1, mid+1, r, ql, qr, valita);
        treeita[nodeita] = min(treeita[2*nodeita], treeita[2*nodeita+1]);
    }
    void update_range(int ql, int qr, long long valita) {
        if (ql <= qr) { update_range(1, 0, sz-1, ql, qr, valita); }
    }
    long long query_min() { return treeita[1]; }
};

struct MinTree {
    int sz;
    vector<long long> treeita;
    void build(int n, vector<long long>& initita) {
        sz = n;
        treeita.assign(4*n, INF);
        _build(1, 0, n-1, initita);
    }
    void _build(int nodeita, int l, int r, vector<long long>& initita) {
        if (l == r) { treeita[nodeita] = initita[l]; return; }
        int mid = (l+r)/2;
        _build(2*nodeita, l, mid, initita);
        _build(2*nodeita+1, mid+1, r, initita);
        treeita[nodeita] = min(treeita[2*nodeita], treeita[2*nodeita+1]);
    }
    void update(int nodeita, int l, int r, int posita, long long valita) {
        if (l == r) { treeita[nodeita] = valita; return; }
        int mid = (l+r)/2;
        if (posita <= mid) { update(2*nodeita, l, mid, posita, valita); }
        else { update(2*nodeita+1, mid+1, r, posita, valita); }
        treeita[nodeita] = min(treeita[2*nodeita], treeita[2*nodeita+1]);
    }
    void update(int posita, long long valita) { update(1, 0, sz-1, posita, valita); }
    long long query_min() { return treeita[1]; }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m, q;
    cin >> n >> m >> q;

    vector<long long> a(n-1), b(n-1);
    for (int i = 0; i < n-1; i++) { cin >> a[i] >> b[i]; }

    vector<vector<pair<int,long long>>> byA(n);
    for (int i = 0; i < m; i++) {
        int x, y; long long z;
        cin >> x >> y >> z;
        x--; y--;
        byA[x].push_back({y, z});
    }

    vector<long long> initValita(n);
    initValita[0] = 0;
    for (int j = 1; j < n; j++) { initValita[j] = b[j-1]; }

    SegTree st;
    st.build(n, initValita);

    vector<long long> c(n+1);

    for (auto [dstita, z] : byA[0]) { st.update_range(0, dstita, z); }
    c[1] = st.query_min();
    for (int p = 2; p <= n; p++) {
        for (auto [dstita, z] : byA[p-1]) { st.update_range(0, dstita, z); }
        c[p] = st.query_min();
    }

    auto getCapA = [&](int p) -> long long {
        if (p == n) { return 0; }
        return a[p-1];
    };

    vector<long long> combinedita(n);
    for (int p = 1; p <= n; p++) { combinedita[p-1] = getCapA(p) + c[p]; }

    MinTree mt;
    mt.build(n, combinedita);

    cout << mt.query_min() << "\n";

    for (int i = 0; i < q; i++) {
        int v; long long w;
        cin >> v >> w;
        a[v-1] = w;
        int p = v;
        mt.update(p-1, w + c[p]);
        cout << mt.query_min() << "\n";
    }

    return 0;
}