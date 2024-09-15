<template>
  <div class="container pt-5">
    <div v-if="flashSaleCampaignFeatureObject.isFlashSaleOn && campaignOver === false">
      <div>
        <h3>
          <span> 💥 Flash Sale!!! </span> Ends in <span>
            <CountdownTimer 
            :campaignEndTime="flashSaleCampaignFeatureObject.flashSaleCampaignEndDateTime"
            @isCampaignTimeOver="isCampaignTimeElapsedCheck($event)"
            />
          </span>
        </h3>
        <hr />
        <div class="row">
          <div class="col-12 pt-5">
            <div
              class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4"
            >
            </div>

            <div class="card-group">
              <div class="card" v-for="product in products" :key="product.id">
                <img :src="product.image" class="card-img-top" alt="" style="height: 323px;">
                <div class="card-body">
                  <h5 class="card-title">{{ product.title }}</h5>
                  <p class="card-text">${{ product.price }}</p>
                </div>
                <div class="card-footer">
                  <div class="d-grid gap-2">
                    <button class="btn btn-primary"> Add to Cart</button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!flashSaleCampaignFeatureObject.isFlashSaleOn || campaignOver === true">
      <h2>Flash sale is over!</h2>
    </div>
  </div>

</template>

<script lang="ts">
import { inject, onMounted, ref } from "vue";
import CountdownTimer from './components/CountdownTimer.vue';
import { ProductFakeStore } from "@/models/product";
import { FlashSaleCampaignFeature } from "@/models/flashsalecampaignfeature";
import { growthBookKey } from "@/utils/growthbook";


export default {
  name: 'HomeComponent',
  components: {
    CountdownTimer
  },
  setup() {
    const growthBookInjectable = inject(growthBookKey);
    const products = ref([] as ProductFakeStore[]);
    const flashSaleCampaignFeatureObject = ref({} as FlashSaleCampaignFeature);
    const campaignOver = ref(false);

    onMounted(() => {
      growthBookInjectable?.init().then((growthBook) => {
        if (!growthBook) {
        console.error("GrowthBook failed to initialize");
        return;
      }

      const flashSaleCampaignFeatureFlagValue = growthBook.getFeatureValue("flash-sale-campaign-feature", null);
      if (flashSaleCampaignFeatureFlagValue) {
         flashSaleCampaignFeatureObject.value = flashSaleCampaignFeatureFlagValue;
      }

      });
      getProducts();
    });

    const getProducts = () => {
      fetch('https://fakestoreapi.com/products?limit=4')
            .then(res=>res.json())
            .then(json => {
              products.value = json;
            });
    };

    const isCampaignTimeElapsedCheck = (isCampaignOver: boolean) => {
      campaignOver.value = isCampaignOver;
    }

    return {
      getProducts,
      products,
      flashSaleCampaignFeatureObject,
      campaignOver,
      isCampaignTimeElapsedCheck,
    };
  }
}

</script>

<style>
#app {
  
}
</style>