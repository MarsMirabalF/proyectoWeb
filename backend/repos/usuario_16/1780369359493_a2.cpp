#include <bits/stdc++.h>
using namespace std;

bool esFinDeSemana(int d) {
    int dita = ((d - 1) % 7) + 1;
    return dita == 6 || dita == 7;
}

bool puedeAsignar(vector<pair<int,int>>& pianosita, int capita, bool evitarFindita) {
    vector<int> usita(101, 0);

    for (auto& [b, e] : pianosita) {
        bool asignadita = false;
        for (int d = b; d <= e; d++) {
            if (evitarFindita && esFinDeSemana(d)) { continue; }
            if (usita[d] < capita) {
                usita[d]++;
                asignadita = true;
                break;
            }
        }
        if (!asignadita) { return false; }
    }
    return true;
}

string resolver(int m, int p, vector<pair<int,int>>& pianosita) {
    int capita = p / 2;

    sort(pianosita.begin(), pianosita.end(), [](auto& a, auto& b){
        return a.second < b.second;
    });

    if (!puedeAsignar(pianosita, capita, false)) { return "serious trouble"; }
    if (puedeAsignar(pianosita, capita, true))  { return "fine"; }
    return "weekend work";
}

int main() {
    int n;
    cin >> n;
    while (n--) {
        int m, p;
        cin >> m >> p;
        vector<pair<int,int>> pianosita(m);
        for (auto& [b, e] : pianosita)
            cin >> b >> e;
        cout << resolver(m, p, pianosita) << "\n";
    }
    return 0;
}