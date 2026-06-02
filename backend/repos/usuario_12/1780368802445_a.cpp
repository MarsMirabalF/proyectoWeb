#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;

    long long sumat = (n * (n + 1)) / 2;
    long long sumaa = 0;

    for (int i = 0; i < n - 1; i++) {
        long long x;
        cin >> x;
        sumaa += x;
    }
    
    long long aux = sumat - sumaa;
    
    cout << aux << endl;

    return 0;
}