---
layout: post
title: "DeePC에서 PE 조건 설계가 성능을 결정한다"
date: 2026-04-05
description: PE rank만으로는 부족하다 — local linearity 보존이 핵심인 이유
tags: [DeePC, PE, data-driven control]
toc:
  beginning: true
---

## TL;DR

DeePC에서 Persistently Exciting (PE) 조건은 **rank 충족 여부**보다 **어떤 운전 영역에서 데이터를 수집했는가**가 훨씬 중요하다. 비선형 시스템에서는 약한 excitation이 local linearity를 보존하여 오히려 더 좋은 제어 성능을 보인다.

---

## 배경

DeePC (Data-Enabled Predictive Control)는 시스템 모델 없이, 입출력 데이터로부터 직접 예측 제어를 수행한다. 이때 수집한 데이터가 Persistently Exciting (PE) 조건을 만족해야 Hankel 행렬이 full rank가 되어 제어가 가능하다.

그런데 PE 조건을 만족하는 방법은 무수히 많다. **어떤 PE가 좋은 PE인가?**

## 실험: EV 열관리 냉매 루프

MathWorks EV Thermal Management Simscape 모델에서, compressor 단독 제어(SISO)로 cabin 온도 21 degC를 추종하는 실험을 수행했다.

### 9가지 PE 조건 비교

| 조건 | 핵심 차이 | SS error (mean) |
|------|----------|-----------------|
| **low_energy** | PRBS amp=0.08 (약한 excitation) | **0.292 degC** |
| short_collect_600s | 수집시간 600s | 0.881 degC |
| baseline | PRBS amp=0.15 (기본) | 1.270 degC |
| **high_energy** | PRBS amp=0.20 (강한 excitation) | **4.793 degC** |

모든 케이스가 PE rank 45/45를 만족했고, QP solver 성공률도 100%였다. 그럼에도 성능 차이가 **16배** 이상 벌어졌다.

## 왜 약한 excitation이 더 좋은가

비선형 시스템에서 DeePC는 **근사적 LTI(Linear Time-Invariant) 가정**에 의존한다. Hankel 행렬이 특정 operating point 근방의 local dynamics를 잘 담고 있어야 한다.

- **약한 excitation** -> operating point 근처에서 국소적 LTI가 유지됨 -> Hankel이 local dynamics를 정확히 포착
- **강한 excitation** -> 여러 operating point의 dynamics가 섞임 -> Hankel이 희석됨 -> 외삽/발산 위험

이것은 데이터 기반 제어의 **bias-variance tradeoff**로 해석할 수 있다: PE를 충족하면서 locally linear regime을 유지하는 것이 sweet spot이다.

## 핵심 교훈

1. **PE rank만으로는 부족하다** — full rank여도 성능 차이가 크다
2. **데이터의 질이 중요하다** — operating region의 대표성이 핵심
3. **비선형 시스템에서는 약한 excitation을 먼저 시도하라** — 강한 excitation은 catastrophic failure를 유발할 수 있다
4. **Offset도 물리적 의미가 있다** — 냉방 목표(21 degC)에서는 높은 compressor offset(0.65)이 낮은 offset(0.35)보다 유리하다

## 참고

- Coulson et al., "Data-Enabled Predictive Control: In the Shallows of the DeePC," 2019
- 본 실험의 상세 결과는 ICROS 2026 논문으로 정리 예정
