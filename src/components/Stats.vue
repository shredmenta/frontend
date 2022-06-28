<template>
    <div class="stats bg-base-300 shadow mb-3 shadow-xl flex rounded-3xl">
        <div class="stat">
            <div class="stat-title">Fiók típusa</div>
            <div class="stat-value">
                {{ plans[user.plan.planType] || user.plan.planType }}
            </div>
        </div>
        <div class="stat">
            <div class="stat-title">Lejár</div>
            <div class="stat-value">
                {{
                    user.planExpires === 0
                        ? "Soha"
                        : new Date(user.planExpires).toLocaleDateString()
                }}
            </div>
        </div>
        <div class="stat">
            <div class="stat-title">Havi limit (felhasznált/max)</div>
            <div
                class="stat-value"
                v-if="user.plan.limits.submitsPerMonth == -1"
            >
                ∞
            </div>
            <div class="stat-value" v-else>
                {{ user.usage.month }} /
                {{ user.plan.limits.submitsPerMonth }}
            </div>
        </div>
        <div class="stat">
            <div class="stat-title">Napi limit (felhasznált/max)</div>
            <div class="stat-value" v-if="user.plan.limits.submitsPerDay == -1">
                ∞
            </div>
            <div class="stat-value" v-else>
                {{ user.usage.day }} /
                {{ user.plan.limits.submitsPerDay }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ user: any }>();

const plans: any = {
    Free: "Ingyenes",
    Premium: "Premium",
};
</script>
