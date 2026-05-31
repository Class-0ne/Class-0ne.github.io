---
layout: post
title: "간단한 수식으로 보는 DeePC"
date: 2026-05-31
description: 제어공학을 한 번 배운 독자를 위한 Data-Enabled Predictive Control 소개
tags: [DeePC, MPC, data-driven control, control]
toc:
  beginning: true
---

## 목표

상태공간 모델

$$
\begin{aligned}
x_{k+1} &= A x_k + B u_k \\
y_k &= C x_k + D u_k
\end{aligned}
$$

와 MPC(Model Predictive Control)의 기본 아이디어를 알고 있다고 가정합니다. 다만 DeePC를 처음 보는 독자를 위해 수식은 최소한으로만 사용하겠습니다.

---

## MPC는 모델로 미래를 예측한다

일반적인 MPC는 현재 상태 $x_k$에서 출발해, 앞으로 넣을 입력열

$$
u_k, u_{k+1}, \dots, u_{k+N-1}
$$

을 가정하고 미래 출력

$$
y_k, y_{k+1}, \dots, y_{k+N-1}
$$

을 예측합니다. 예측은 상태공간 모델로 합니다.

$$
x_{k+1} = A x_k + B u_k
$$

그리고 목표 출력 $r_k$를 잘 따라가면서 입력을 너무 크게 쓰지 않도록 다음과 같은 최적화 문제를 풉니다.

$$
\min_{u_0,\dots,u_{N-1}}
\sum_{i=0}^{N-1}
\left(
\|y_i-r_i\|_Q^2 + \|u_i\|_R^2
\right)
$$

핵심은 간단합니다.

- 모델 $(A,B,C,D)$로 미래를 예측한다.
- 예측 결과가 목표에 가까워지도록 입력을 고른다.
- 계산된 입력 중 첫 번째 입력만 실제 시스템에 적용한다.

## DeePC의 질문

DeePC는 여기서 질문을 바꿉니다.

> 모델 $(A,B,C,D)$를 꼭 알아야 할까?

실험이나 시뮬레이션을 통해 이미 입력 데이터와 출력 데이터를 많이 가지고 있다면, 그 데이터 자체로 미래를 예측할 수 있지 않을까 하는 생각이 DeePC의 출발점입니다.

즉, MPC가

$$
\text{model} \rightarrow \text{prediction} \rightarrow \text{control}
$$

이라면 DeePC는

$$
\text{data} \rightarrow \text{prediction} \rightarrow \text{control}
$$

입니다.

## 데이터를 행렬로 쌓기: Hankel 행렬

DeePC는 과거에 수집한 입력 데이터

$$
u_d = \{u_1, u_2, \dots, u_T\}
$$

와 출력 데이터

$$
y_d = \{y_1, y_2, \dots, y_T\}
$$

를 사용합니다.

길이 $L$짜리 조각들을 옆으로 쌓으면 다음과 같은 Hankel 행렬을 만들 수 있습니다.

$$
H_L(u_d)=
\begin{bmatrix}
u_1 & u_2 & \cdots \\
u_2 & u_3 & \cdots \\
\vdots & \vdots & \ddots \\
u_L & u_{L+1} & \cdots
\end{bmatrix}
$$

마지막 열은 $[u_{T-L+1},\,u_{T-L+2},\,\dots,\,u_T]^T$가 됩니다.

출력도 같은 방식으로 $H_L(y_d)$를 만듭니다.

이 행렬의 각 열은 "시스템이 실제로 움직였던 짧은 궤적 조각"입니다. DeePC는 이 조각들을 선형 결합해서 새로운 궤적을 만들 수 있다고 봅니다.

$$
\begin{bmatrix}
u \\
y
\end{bmatrix}
=
\begin{bmatrix}
H_L(u_d) \\
H_L(y_d)
\end{bmatrix} g
$$

여기서 $g$는 데이터 조각들을 어떤 비율로 섞을지 정하는 계수 벡터입니다.

## 과거와 미래를 나누기

제어를 하려면 현재 상황을 알아야 하고, 앞으로의 행동도 정해야 합니다. 그래서 DeePC에서는 Hankel 행렬을 과거 구간과 미래 구간으로 나눕니다.

$$
\begin{bmatrix}
U_p \\
Y_p \\
U_f \\
Y_f
\end{bmatrix} g
=
\begin{bmatrix}
u_{\mathrm{ini}} \\
y_{\mathrm{ini}} \\
u_f \\
y_f
\end{bmatrix}
$$

각 기호의 의미는 다음과 같습니다.

| 기호 | 의미 |
|---|---|
| $u_{\mathrm{ini}}$ | 최근에 실제로 넣은 입력 |
| $y_{\mathrm{ini}}$ | 최근에 실제로 관측한 출력 |
| $u_f$ | 앞으로 넣을 입력 |
| $y_f$ | 앞으로 예측되는 출력 |
| $g$ | 데이터 조각을 섞는 계수 |

위 식에서 중요한 부분은 앞의 두 줄입니다.

$$
U_p g = u_{\mathrm{ini}},\qquad Y_p g = y_{\mathrm{ini}}
$$

이 조건은 "현재 시스템의 최근 움직임과 잘 맞는 데이터 조합만 사용하라"는 뜻입니다.

그 조건을 만족하는 $g$를 찾으면, 같은 $g$로 미래도 예측할 수 있습니다.

$$
u_f = U_f g,\qquad y_f = Y_f g
$$

## DeePC 최적화 문제

이제 DeePC의 최적화 문제를 간단히 쓰면 다음과 같습니다.

$$
\begin{aligned}
\min_{g,u_f,y_f}\quad
& \sum_{i=0}^{N-1}
\left(
\|y_i-r_i\|_Q^2
+ \|u_i\|_R^2
\right) \\
& + \lambda_g \|g\|_2^2
\end{aligned}
$$

$$
\begin{aligned}
\text{s.t.}\quad
\begin{bmatrix}
U_p \\
Y_p \\
U_f \\
Y_f
\end{bmatrix} g
&=
\begin{bmatrix}
u_{\mathrm{ini}} \\
y_{\mathrm{ini}} \\
u_f \\
y_f
\end{bmatrix}
\end{aligned}
$$

필요하면 입력 제한과 출력 제한도 추가합니다.

$$
u_f \in \mathcal{U},\qquad y_f \in \mathcal{Y}
$$

MPC와 비교하면 비용함수의 형태는 거의 비슷합니다. 차이는 예측을 만드는 방식입니다.

| 구분 | MPC | DeePC |
|---|---|---|
| 예측 방법 | 상태공간 모델 사용 | 데이터 행렬 사용 |
| 필요한 것 | $A,B,C,D$ | 입력-출력 데이터 |
| 최적화 변수 | 주로 미래 입력 | $g$, 미래 입력, 미래 출력 |
| 핵심 제약식 | 시스템 동역학 | Hankel 데이터 방정식 |

## PE 조건은 왜 필요한가

DeePC가 잘 작동하려면 수집 데이터가 시스템의 다양한 움직임을 충분히 포함해야 합니다. 이를 보통 persistently exciting, 줄여서 PE 조건이라고 합니다.

직관적으로는 다음과 같습니다.

- 입력을 거의 일정하게만 주면 시스템의 한 가지 반응만 보게 됩니다.
- 다양한 입력을 주면 시스템의 여러 반응을 볼 수 있습니다.
- 여러 반응이 데이터 안에 있어야 미래 궤적을 잘 조합할 수 있습니다.

선형 시스템에서는 충분히 좋은 데이터가 있으면, DeePC의 데이터 방정식이 모델 기반 예측을 대체할 수 있습니다. 이 배경에 있는 이론이 Willems' Fundamental Lemma입니다.

처음 DeePC를 접할 때는 이렇게 이해하면 충분합니다.

> PE 조건은 데이터가 시스템의 가능한 움직임을 표현할 만큼 충분히 풍부해야 한다는 조건이다.

## 노이즈가 있으면 어떻게 하나

실제 데이터에는 센서 노이즈와 모델 불일치가 있습니다. 그러면

$$
Y_p g = y_{\mathrm{ini}}
$$

를 정확히 만족시키기 어려울 수 있습니다. 그래서 slack 변수 $\sigma_y$를 넣어 다음처럼 완화합니다.

$$
Y_p g = y_{\mathrm{ini}} + \sigma_y
$$

그리고 비용함수에 slack을 너무 크게 쓰지 못하도록 벌점을 추가합니다.

$$
\lambda_y \|\sigma_y\|_2^2
$$

실무적인 DeePC 문제는 보통 다음 형태에 가까워집니다.

$$
\begin{aligned}
\min_{g,u_f,y_f,\sigma_y}\quad
& \sum_{i=0}^{N-1}
\left(
\|y_i-r_i\|_Q^2
+ \|u_i\|_R^2
\right) \\
& + \lambda_g \|g\|_2^2
+ \lambda_y \|\sigma_y\|_2^2
\end{aligned}
$$

$$
\begin{aligned}
\text{s.t.}\quad
\begin{bmatrix}
U_p \\
Y_p \\
U_f \\
Y_f
\end{bmatrix} g
&=
\begin{bmatrix}
u_{\mathrm{ini}} \\
y_{\mathrm{ini}} + \sigma_y \\
u_f \\
y_f
\end{bmatrix}
\end{aligned}
$$

여기서 $\lambda_g$와 $\lambda_y$는 단순한 튜닝 숫자가 아니라, 데이터 기반 예측이 너무 과하게 흔들리지 않도록 잡아 주는 중요한 파라미터입니다.

## 정리

DeePC는 MPC와 완전히 다른 철학처럼 보이지만, 구조를 보면 익숙합니다.

- 목표 출력 $r$을 따라가도록 비용함수를 만든다.
- 입력 사용량을 줄이도록 $R$ 가중치를 둔다.
- 제한 조건을 넣을 수 있다.
- 매 시점 최적화 문제를 풀고 첫 번째 입력만 적용한다.

다만 DeePC는 미래 예측에 상태공간 모델을 쓰지 않습니다. 대신 수집한 입출력 데이터를 Hankel 행렬로 만들고, 그 데이터 조각들의 선형 결합으로 가능한 궤적을 표현합니다.

한 문장으로 정리하면 다음과 같습니다.

> DeePC는 모델 기반 MPC의 예측 모델을 데이터 행렬로 바꾼 데이터 기반 예측 제어 방법이다.
