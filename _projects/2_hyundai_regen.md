---
layout: page
title: Personalized Regenerative Braking Control
company: Hyundai
description: 운전자 선호와 개입 가능성을 함께 고려한 개인화 회생제동 제어 연구.
importance: 2
category: graduate
tags: [MPC, Regenerative Braking, CarMaker]
---

## Overview

- **과제명**: 도심주행에서 에너지 고효율 모션 제어를 위한 주행 최적화 및 실적용성 향상 기술 개발
- **기간**: 2025.07.15 ~ 2026.07.14
- **발주처**: 현대자동차
- **역할**: 참여 연구원

도심주행 조건에서 에너지 회수를 극대화하면서도 운전자 개입을 최소화하는 개인화 회생제동 제어기를 설계하는 프로젝트입니다.

## Problem

기존 자동 회생제동 로직은 에너지 회수 극대화에만 초점을 맞추고 있어, 운전자의 실제 제동 성향을 충분히 반영하지 못하는 한계가 있었습니다. 자동 회생제동이 운전자의 기대보다 이르게 또는 강하게 작동하면 운전자는 가속 페달(APS)로 개입하게 되고, 제어기가 의도한 회생에너지 회수 기회를 놓치게 됩니다. 결국 에너지 효율 중심 제어가 오히려 실적용성을 떨어뜨리는 결과를 낳습니다.

이 문제를 단순 제동 성능 문제가 아니라, **운전자 개입 가능성과 회수 에너지의 trade-off를 함께 다뤄야 하는 문제**로 재정의했습니다.

## Approach

운전자 성향을 하나의 지표로 단순화하지 않고 두 가지 분포로 분리하여 모델링했습니다.

- **운전자 선호 분포 (BPS 기반)**: 자동제동이 없는 상황에서 운전자가 직접 브레이크를 밟아 정지하는 제동 거리 분포
- **운전자 개입 분포 (APS 기반)**: 자동회생제동이 활성화된 상황에서 운전자가 가속 페달로 개입하고 정지하는 거리 분포

두 분포를 각각 **GPR (Gaussian Process Regression)** 으로 모델링했습니다. 데이터가 많지 않은 조건에서도 적용 가능하고, 분포의 불확실성까지 함께 반영할 수 있기 때문입니다. 입력은 현재 차량 속도, 출력은 각 조건에서의 제동 거리입니다.

이후 두 분포 사이를 **최적 제동 거리 후보군**으로 설정하고, 그 안에서 운전자 개입 가능성과 회수 에너지를 동시에 고려하는 최적 제어기를 Simulink에서 구현했습니다. 검증은 CarMaker 기반 도심주행 시나리오로 수행했습니다.

## Direct Contribution

- 운전자 주행 데이터 전처리 코드 작성
- GPR 기반 운전자 선호·개입 분포 모델링 코드 리뷰
- Simulink 상 최적 제어기 구현
- CarMaker 기반 운전자 데이터 수집 및 시나리오별 검증 수행

## Outputs

- IFAC WC 2026 — *Personalized Energy-Aware Regenerative Braking Control Minimizing Driver Interventions* (accepted)
- CarMaker/Simulink 기반 시나리오별 제동 성능 및 운전자 개입 분석 결과
