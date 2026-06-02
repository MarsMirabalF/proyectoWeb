#include <bits/stdc++.h>
using namespace std;

int calcular(int n, int m) {
    
    int filasi = n - 2;
    
    int columi = m - 2;

    int filasx = (filasi + 2) / 3;
    
    int columx = (columi + 2) / 3;

    return filasx * columx;
}

int main() {
    int t;
    cin >> t;

    while (t > 0) {
        int n, m;
        cin >> n >> m;
        cout << calcular(n, m) << endl;
        t--;
    }
    return 0;
}