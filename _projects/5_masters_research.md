---
layout: page
title: DeePC
company: Research
description: DeePC 연구 주제 정리.
importance: 5
category: graduate
toc:
  beginning: true
---

## Overview

**DeePC (Data-Enabled Predictive Control)**는 시스템의 물리 모델 없이, 수집된 입출력 데이터로부터 직접 예측 제어기를 구성하는 방법론입니다.

기존 MPC는 상태공간 모델 $(A, B, C, D)$을 필요로 합니다. 하지만 EV 통합 열관리 시스템처럼 상태 수가 많고 비선형성이 강한 시스템은 정확한 물리 모델을 만들기가 어렵습니다. DeePC는 이 문제를 우회합니다. Willems' Fundamental Lemma에 기반해, **PE 조건을 만족하는 데이터가 있으면 시스템의 모든 가능한 trajectory를 데이터로부터 직접 표현할 수 있다**는 사실을 활용합니다.

| | MPC | DeePC |
|---|---|---|
| 모델 | 상태공간 모델 필요 | 입출력 데이터만 필요 |
| 식별 단계 | 별도 시스템 식별 필요 | 불필요 |
| 비선형 시스템 | 선형화 필요 | 데이터 수집 범위로 근사 |
| 계산 구조 | QP / NLP | QP (선형 시스템 기준) |

---

## Willems' Fundamental Lemma

길이 $T$의 입력 신호 $u_d$가 order $L + n$으로 Persistently Exciting하면, 선형 시불변 시스템에서 길이 $L$의 **모든** trajectory $(u, y)$는 다음과 같이 표현됩니다:

$$\begin{bmatrix} \mathcal{H}_L(u_d) \\ \mathcal{H}_L(y_d) \end{bmatrix} g = \begin{bmatrix} u \\ y \end{bmatrix}$$

여기서 $\mathcal{H}_L(\cdot)$은 Hankel 행렬, $g \in \mathbb{R}^{T-L+1}$은 결합 계수 벡터입니다.

이 Lemma가 말하는 것은 간단합니다. 데이터 행렬의 column space가 시스템의 모든 가능한 거동을 span한다는 것입니다. 즉, 데이터 행렬이 시스템 모델을 대체합니다.

---

## 문제 정식화

수집한 오프라인 데이터 $(u_d, y_d)$로부터 Hankel 행렬을 구성하고, 매 control step마다 다음 QP를 풀어 최적 입력을 결정합니다:

$$\min_{g,\, u_f,\, y_f} \quad \sum_{k=0}^{N-1} \left( \|y_f^k - r^k\|_Q^2 + \|u_f^k\|_R^2 \right) + \lambda_g \|g\|_2^2 + \lambda_y \|\sigma_y\|_2^2$$

$$\text{s.t.} \quad \begin{bmatrix} U_{ini} \\ Y_{ini} \\ U_f \\ Y_f \end{bmatrix} g = \begin{bmatrix} u_{ini} \\ y_{ini} \\ u_f \\ y_f + \sigma_y \end{bmatrix}, \quad u_f \in \mathcal{U}, \quad y_f \in \mathcal{Y}$$

### 주요 변수

| 변수 | 설명 |
|---|---|
| $T_{ini}$ | initial condition 길이 (시스템 order 이상) |
| $N$ | prediction horizon |
| $u_{ini},\, y_{ini}$ | 현재 시점 이전 $T_{ini}$개의 입출력 |
| $g$ | trajectory를 합성하는 결합 계수 |
| $\sigma_y$ | noisy 시스템을 위한 slack 변수 |
| $\lambda_g$ | $g$ 정규화 계수 (비선형 시스템에서 중요) |
| $\lambda_y$ | $\sigma_y$ 정규화 계수 |

$\lambda_g$와 $\lambda_y$는 단순 수치 안정화가 아니라, 비선형 시스템에서 **local linearity를 유지하는 핵심 파라미터**입니다.

---

## Hankel 행렬 구성

길이 $T$의 신호 $w \in \mathbb{R}^T$에 대한 order $L$ Hankel 행렬:

$$\mathcal{H}_L(w) = \begin{bmatrix} w_1 & w_2 & \cdots & w_{T-L+1} \\ w_2 & w_3 & \cdots & w_{T-L+2} \\ \vdots & & \ddots & \vdots \\ w_L & w_{L+1} & \cdots & w_T \end{bmatrix} \in \mathbb{R}^{L \times (T-L+1)}$$

다변수 신호 $w \in \mathbb{R}^{m}$인 경우 각 column은 $mL$차원 벡터로 구성됩니다.

```matlab
function H = hankel_matrix(data, L)
% data : [T x m]  (T: 데이터 길이, m: 신호 차원)
% L    : Hankel order
% H    : [L*m x (T-L+1)]

[T, m] = size(data);
cols = T - L + 1;
H = zeros(L * m, cols);
for i = 1:cols
    H(:, i) = reshape(data(i:i+L-1, :)', [], 1);
end
end
```

PE 조건 충족을 위해 컬럼 수 $(T - L + 1)$가 충분히 커야 합니다. 실무적으로는 $T \geq (m+p)(T_{ini} + N + n) - 1$ 를 기준으로 잡습니다.

---

## DeePC 기본 구조

```matlab
%% 파라미터
T_ini     = 5;      % initial condition 길이
N         = 20;     % prediction horizon
lambda_g  = 1e2;    % g 정규화
lambda_y  = 1e4;    % sigma_y 정규화
Q         = eye(p); % 출력 가중치
R         = eye(m); % 입력 가중치

%% Hankel 행렬 구성
L   = T_ini + N;
U_H = hankel_matrix(u_data, L);   % [m*L x cols]
Y_H = hankel_matrix(y_data, L);   % [p*L x cols]

U_ini = U_H(1:m*T_ini, :);
U_f   = U_H(m*T_ini+1:end, :);
Y_ini = Y_H(1:p*T_ini, :);
Y_f   = Y_H(p*T_ini+1:end, :);

%% Control loop
for t = 1:T_sim
    u_ini = u_buf((end-T_ini+1):end);   % 최근 T_ini개 입력
    y_ini = y_buf((end-T_ini+1):end);   % 최근 T_ini개 출력

    % QP 풀기 (변수: g, u_f, sigma_y)
    % minimize  ||Y_f*g - ref||_Q + ||U_f*g||_R + lambda_g*||g||^2 + lambda_y*||sigma_y||^2
    % s.t.      U_ini*g = u_ini
    %           Y_ini*g = y_ini + sigma_y
    %           u_lb <= U_f*g <= u_ub

    [g_opt, ~] = solve_deepc_qp(...);
    u_apply = U_f(1:m, :) * g_opt;   % receding horizon: 첫 번째 입력만 적용

    % 시스템에 적용 후 버퍼 업데이트
    y_next = apply_input(u_apply);
    u_buf  = [u_buf; u_apply];
    y_buf  = [y_buf; y_next];
end
```

---

## Related Notes

- [DeePC에서 PE 조건 설계가 성능을 결정한다](/blog/2026/deepc-pe-condition-design/) — PE rank만으로는 부족하다: local linearity 보존이 핵심
